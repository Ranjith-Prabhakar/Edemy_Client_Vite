import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../../redux/features/auth/authApi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import responseErrorCatch from "../../../utils/responseErrorToast";
import { useFormik } from "formik";
import { resetForgotPasswordSchema } from "../../../schema/resetForgotPasswordSchema";

export function useResetForgotPassword() {
  const navigate = useNavigate();
  const [resetPassword, { isSuccess, data, isError, error }] =
    useResetPasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      navigate("/auth/login");
    } else if (isError) {
      responseErrorCatch(error);
    }
  }, [isSuccess, isError, data, navigate, error]);
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
      password: "",
    },
    validationSchema: resetForgotPasswordSchema,
    onSubmit: async (values, actions) => {
      await resetPassword({ password: values.password });
      actions.resetForm();
    },
  });
  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}
