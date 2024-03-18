import { useEffect } from "react";
import { usePaymentStatusMutation } from "../redux/features/course/courseApi";
import { useNavigate } from "react-router-dom";
import useGetUser from "../hooks/useGetUser";

const PaymentSucess = () => {
  const navigate = useNavigate()
  const user = useGetUser()
  const [paymentStatus,{data,isSuccess,isError,error}] = usePaymentStatusMutation();
  useEffect(()=>{
    if(isSuccess){
      console.log("success")
      navigate(`/${user.role}/my_learnings`);
    }
    if(isError) console.log(error)
  },[data, error, isError, isSuccess])
  return (
    <div className=" bg-gradient-to-r from-body-gradient-one to-body-gradient-two h-screen flex items-center justify-center">
      <div className="p-6 bg-c_color-colorSeven text-white md:mx-auto rounded-md shadow-lg">
        <svg
          viewBox="0 0 24 24"
          className="text-green-600 w-16 h-16 mx-auto my-6"
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base  font-semibold text-center">
            Payment Done!
          </h3>
          <p className="text-gray-600 my-2">
            Thank you for completing your secure online payment.
          </p>
          <p> Have a great day! </p>
          <div className="py-10 text-center">
            <button
              onClick={() => {
                paymentStatus({ paymentStatus: true });
              }}
              className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
            >
              Go To My Learning
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSucess;
