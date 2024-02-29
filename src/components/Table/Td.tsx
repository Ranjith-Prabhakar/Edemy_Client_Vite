import { ComponentPropsWithRef, ReactNode } from "react";

type TdProps = {
  children: ReactNode;
  props?:ComponentPropsWithRef<"td">
};

const Td = ({ children, ...props }: TdProps) => {
  return (
    <td className="px-6 py-4" {...props}>
      {children}
    </td>
  );
};

export default Td;
