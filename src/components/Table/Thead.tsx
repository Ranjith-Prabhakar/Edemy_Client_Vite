import { ReactNode } from "react";

type TableHeadProps = {
  children: ReactNode;
};

const Thead = ({ children }: TableHeadProps) => {
  return (
    <thead className="text-xs uppercase dark:bg-c_color-colorSeven dark:text-white">
      {children}
    </thead>
  );
};

export default Thead;
