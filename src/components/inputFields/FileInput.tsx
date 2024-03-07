import React, { forwardRef } from "react";

type InputProps = React.ComponentPropsWithRef<"input"> & {
  label: string;
};

const FileInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...props }, ref) => {
    return (
      <div>
        <label htmlFor={props.id} className="block mb-2 text-sm font-medium">
          {label}
        </label>
        <input
          ref={ref}
          className="bg-gray-50 border border-gray-300 text-black dark:text-black sm:text-sm rounded-lg focus:ring-c_color-colorTwo focus:border-c_color-colorTwo block w-full  dark:bg-c_color-colorThree dark:placeholder-gray-400"
          aria-describedby={`${props.id}_help`}
          id={props.id}
          type="file"
          {...props}
        />
      </div>
    );
  }
);

export default FileInput;
