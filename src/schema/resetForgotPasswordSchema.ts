import * as yup from "yup";
const passwordRules: RegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
const stringRule: RegExp = /^[^\s]+(\s[^\s]+)*$/;

export const resetForgotPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8)
    .matches(passwordRules, { message: "Please create a strong password" })
    .test(
      "string-rule",
      "Custom validation message for stringRule",
      function (value) {
        return value !== undefined && stringRule.test(value);
      }
    )
    .required("Please create a strong password"),
});
