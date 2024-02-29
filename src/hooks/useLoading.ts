import { useEffect, useState } from "react";

type Props = {
  isLoading: boolean;
  isSuccess: boolean;
};

const useLoading = ({ isLoading, isSuccess }: Props) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    } else if (isSuccess) {
      setLoading(false);
    }
  }, [isLoading, isSuccess]);
  return loading;
};

export default useLoading;

// not used anywhere yet *********************************************
