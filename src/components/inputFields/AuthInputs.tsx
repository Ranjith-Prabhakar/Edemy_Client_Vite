import { ComponentPropsWithRef } from "react";

type InputProps = ComponentPropsWithRef<"input"> & {
  label: string;
};

const AuthInputs = ({ label, ...props }: InputProps) => {
  // here we will get all the attributes and we can spread it into this props variable
  return (
    <>
      <label htmlFor={props.name} className="block mb-2 text-sm font-medium">
        {label}
      </label>
      <input
        id={props.name}
        placeholder={props.placeholder || "••••••••"}
        className="bg-gray-50 border border-gray-300 text-black dark:text-black sm:text-sm rounded-lg focus:ring-c_color-colorTwo focus:border-c_color-colorTwo block w-full p-2.5 dark:bg-c_color-colorThree dark:placeholder-gray-400"
        {...props}
      />
    </>
  );
};

export default AuthInputs;
