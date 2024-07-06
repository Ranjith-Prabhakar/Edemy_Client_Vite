import { useFormik } from "formik";
import { beInstructorSchema } from "../../schema/beInstructor";
import { useToBeInstructorMutation } from "../../redux/features/user/userApi";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import responseErrorCatch from "../../utils/responseErrorToast";
import AuthInputs from "../../components/inputFields/AuthInputs";
import GeneralButton from "../../components/Buttons/GeneralButton";
import FileInput from "../../components/inputFields/FileInput";
import {
  useAddFileToCloudMutation,
  useAddToBucketMutation,
} from "../../redux/features/course/courseApi";
import { useSelector } from "react-redux";
import { IUserState } from "../../redux/interfaces/authApi";
import { SpinnerButton } from "../../components/Buttons/SpinnerButton";
import ContainerLayout from "../../layouts/ContainerLayout";
import Header from "../../layouts/Header";

const BeInstructor = () => {
  const [invalidFileType, setInvalidFileType] = useState(false);
  const [loading, setLoading] = useState(false);
  const userId = useSelector(
    (state: { user: IUserState }) => state.user.userData._id as string
  );
  const [addFileToCloud] = useAddFileToCloudMutation();
  const certificateRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [toBeInstructor, { data, isSuccess, isError, error, isLoading }] =
    useToBeInstructorMutation();
  const [addToBucket] = useAddToBucketMutation();
  useEffect(() => {
    if (isSuccess) {
      setLoading(false);
      toast.success(data.message);
      navigate("/user/profile");
    } else if (isLoading) {
      setLoading(true);
    } else if (isError) {
      setLoading(false);
      responseErrorCatch(error);
      navigate("/user/profile");
    }
  }, [isSuccess, isError, data, navigate, error, isLoading]);
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      qualification: "",
      certificate: "",
    },
    validationSchema: beInstructorSchema,
    onSubmit: async (values, actions) => {
      const fileInput = certificateRef.current?.files?.[0] as File;
      const certificateFileType = certificateRef.current?.files?.[0].name
        .split(".")
        .pop() as string;
      if (!["png", "jpeg", "pdf"].includes(certificateFileType?.trim())) {
        setInvalidFileType(true);
      } else {
        setInvalidFileType(false);
        try {
          const result = await addFileToCloud({
            fileName: `certificate.${certificateFileType}`,
            userId: userId,
            contentType: `${
              ["png", "jpeg"].includes(certificateFileType)
                ? "image"
                : "application"
            }/${certificateFileType}`,
            folderName: "certificate",
          });

          if ("data" in result) {
            await addToBucket({
              url: result?.data,
              body: fileInput,
              contentType: certificateFileType,
            });
            await toBeInstructor({
              qualification: values.qualification,
              certificate: `${userId}/${"certificate"}/${"certificate"}.${certificateFileType}`,
            });
            actions.resetForm();
          }
        } catch (error) {
          responseErrorCatch(error);
        }
      }
    },
  });

  return (
    <ContainerLayout>
      <Header />
      <section>
        <div className="flex flex-col items-center justify-center 400px:px-6 400px:py-8 mx-auto h-full lg:py-0">
          <div className="w-full bg-white rounded-lg shadow-lg md:mt-0 sm:max-w-md xl:p-0 dark:bg-c_color-colorSeven">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="flex justify-center items-center">
                <h1 className="text-xl font-bold capitalize leading-tight tracking-tightmd:text-2xl ">
                  Be a instructor
                </h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <h3 className="mb-2  border border-gray text-md rounded-lg  block  p-2.5">
                    You are responsible to provide quality education, adhere to
                    the platform's guidelines, maintain professionalism, engage
                    students effectively, and continuously improve your teaching
                    methods for an enriching e-learning experience. tutor agrees
                    to a revenue-sharing model of 30/70, where the tutor
                    receives 70% of the income generated, and the platform
                    retains 30%, as specified in our terms and conditions
                  </h3>

                  {/* Demo Data */}
                  <div className="flex items-center justify-center flex-col">
                    <div className="flex items-start justify-center flex-col">
                      <h6 className="text-lg text-[#FFC0CB] font-bold my-2">
                        {" "}
                        Admin approval may take a little time. If you want to
                        just try out you can use the below data
                      </h6>
                      <h4 className="text-lg text-yellow-300 font-bold">
                        Email: hadi@gmail.com
                      </h4>
                      <h4 className="text-lg text-yellow-300 font-bold mb-2">
                        Password: Test@123
                      </h4>
                    </div>
                  </div>

                  <AuthInputs
                    type="text"
                    name="qualification"
                    value={values.qualification}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Add Qualification"
                    label="Add Qualification"
                  />
                  {errors.qualification && touched.qualification && (
                    <p className="text-red-600">{errors.qualification}</p>
                  )}
                </div>
                <div>
                  <FileInput
                    ref={certificateRef}
                    id="certificate"
                    value={values.certificate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Add Certificate"
                  />

                  {errors.certificate && touched.certificate && (
                    <p className="text-red-600">{errors.certificate}</p>
                  )}
                  {invalidFileType && (
                    <p className="text-red-600">
                      invalid file type (accepts only jpeg,png and pdf)
                    </p>
                  )}
                </div>

                {loading ? (
                  <SpinnerButton status="Validating Data" />
                ) : (
                  <GeneralButton
                    type="submit"
                    disabled={isSubmitting} //
                  >
                    Submit
                  </GeneralButton>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </ContainerLayout>
  );
};

export default BeInstructor;
