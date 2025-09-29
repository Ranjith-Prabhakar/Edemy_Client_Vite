import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../redux/features/auth/authApi";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { ILoginRes } from "../../../redux/interfaces/authApi";
import { loginSchema } from "../../../schema/authSchema";

export function useLogin() {
  const navigate = useNavigate();
  const [login, { isSuccess, isLoading, isError, error }] = useLoginMutation();
  const [loading, setLoading] = useState(false);
  const [gButtonError, setGButtonError] = useState(true);

  useEffect(() => {
    if (isSuccess) {
      setLoading(false);
      toast.success("user logged in successfully");
      navigate("/");
    } else if (isLoading) {
      setLoading(true);
      toast.loading;
    } else if (isError && error) {
      console.log("erorr Login", error);
      setLoading(false);
      if ("data" in error) {
        if (error.data) {
          const dataType = error.data as ILoginRes;
          toast.error(dataType.message);
        }
      }
    }
  }, [isSuccess, isLoading, isError, error, navigate]);

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
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, actions) => {
      await login({ email: values.email, password: values.password });
      actions.resetForm();
    },
  });

  return {
    loading,
    gButtonError,
    setGButtonError,
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}
