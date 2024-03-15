import { ReactNode } from "react";

type ChildProp = {
  children: ReactNode;
};
const ContainerLayout = ({ children }: ChildProp) => {
  return (
    <div className="w-full 1000px:max-w-[95%]  1000px:m-auto ">{children}</div>
  );
};

export default ContainerLayout;
