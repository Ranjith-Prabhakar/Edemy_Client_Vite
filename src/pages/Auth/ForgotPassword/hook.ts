import { useNavigate } from "react-router-dom";
import { useForgotPasswordEmailSubmissionMutation } from "../../../redux/features/auth/authApi";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import responseErrorCatch from "../../../utils/responseErrorToast";
import { forgotPasswordEmailSchema } from "../../../schema/forgotPasswordSchema";

export function useForgotPassword() {
  const navigate = useNavigate();
  const [
    forgotPasswordEmailSubmission,
    { isSuccess, data, isError, error, isLoading },
  ] = useForgotPasswordEmailSubmissionMutation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setLoading(false);
      if (data && "message" in data) {
        toast.success(data.message as string);
        navigate("/auth/forgot_password_otp_verification");
      }
    } else if (isLoading) {
      setLoading(true);
    } else if (isError) {
      setLoading(false);
      responseErrorCatch(error);
    }
  }, [isSuccess, isError, data, navigate, error, isLoading]);
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
      email: "",
    },
    validationSchema: forgotPasswordEmailSchema,
    onSubmit: async (values, actions) => {
      await forgotPasswordEmailSubmission({ email: values.email });
      actions.resetForm();
    },
  });

  return {
    loading,
    values,
    errors,
    touched,
    navigate,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}
