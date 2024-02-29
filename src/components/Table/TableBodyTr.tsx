import { ReactNode } from "react";

type TableBodyTrProps = {
  lastIndex: boolean;
  index: number;
  children: ReactNode;
};

const TableBodyTr = ({ lastIndex, index, children }: TableBodyTrProps) => {
  return (
    <tr
      className={`${
        lastIndex && "border-b-2"
      } hover:opacity-85 cursor-pointer font-bold dark:bg-gradient-to-r from-body-gradient-one to-body-gradient-two  dark:text-white `}
      key={index}
    >
      {children}
    </tr>
  );
};

export default TableBodyTr;
