import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../../redux/features/auth/authApi";
import { useEffect } from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { signupSchema } from "../../../schema/authSchema";
import responseErrorCatch from "../../../utils/responseErrorToast";
import { catchError } from "../../../utils/catchError";

export function useSignUp() {
  const [register, { isSuccess, isError, error, isLoading }] =
    useRegisterMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      toast.success("otp has been sent to your mail");
      navigate("/auth/otp_verification", { state: { fromSignup: true } });
    } else if (isError) {
      responseErrorCatch(error);
    }
  }, [isSuccess, isError, isLoading]);

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: async (values, actions) => {
      try {
        await register({
          name: values.name,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
        });
        actions.resetForm();
      } catch (error: unknown) {
        catchError(error);
      }
    },
  });

  return {
    isLoading,
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}
