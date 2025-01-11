import { ReactNode } from "react";

type TableHeadProps = {
  children: ReactNode;
};

const Thead = ({ children }: TableHeadProps) => {
  return (
    <thead className="text-xs uppercase bg-c_color-colorSeven text-white">
      {children}
    </thead>
  );
};

export default Thead;
