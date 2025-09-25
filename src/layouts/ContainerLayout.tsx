import { ReactNode } from "react";

type ChildProp = {
  children: ReactNode;
};
const ContainerLayout = ({ children }: ChildProp) => {
  return (
    <div className="w-full 400px:max-w-[95%]  400px:m-auto ">{children}</div>
  );
};

export default ContainerLayout;
