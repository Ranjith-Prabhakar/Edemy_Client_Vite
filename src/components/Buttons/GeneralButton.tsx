import { ComponentPropsWithRef, ReactNode } from "react";

type ButtonProp = ComponentPropsWithRef<"button">&{
   children:ReactNode
}
const GeneralButton = ({children, ...props }: ButtonProp) => {
  return (
    <button
      className="w-full focus:ring-1 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-c_color-colorFour dark:hover:bg-c_color-colorFive "
      {...props}
    >
      {children}
    </button>
  );
};

export default GeneralButton;
