import { ReactNode } from "react";

type ThProps = {
  children: ReactNode;
};

const Th = ({ children }: ThProps) => {
  return (
    <th scope="col" className="px-6 py-3">
      {children}
    </th>
  );
};

export default Th;
