import { Route, Routes, useNavigate } from "react-router-dom";
import useGetUser from "../hooks/useGetUser";
import BeInstructor from "../pages/User/BeInstructor";
import PaymentSucess from "../features/PaymentSucess";
import MyLearninig from "../pages/General/MyLearninig";
import ContainerLayout from "../layouts/ContainerLayout";
import Header from "../layouts/Header";
import SideBar from "../layouts/SideBar";
import Table from "../features/Instructor/Table";
import { userSideBar } from "../data/UserSideBar";

const UserRoute = () => {
  const user = useGetUser();
  const navigate = useNavigate();
  if (!user.name) {
    navigate("/auth/login");
  }
  return (
    <div>
      {user.role === "user" && (
        // <Routes>
        //   <Route path="/profile/*" element={<UserDash />} />
        //   <Route path="/be_instructor" element={<BeInstructor />} />
        //   <Route path="payment_success" element={<PaymentSucess />} />
        //   <Route path="my_learnings" element={<MyLearninig />} />
        // </Routes>
        <ContainerLayout>
          <Header />
          <div className="h-[79vh] flex justify-start gap-2 mt-[4%] pb-2">
            <SideBar sideBarData={userSideBar} />
            <div className="flex flex-col gap-2 h-full overflow-scroll scroll-m-1 dark:bg-c_color-colorOne shadow-md ring-gray-400  p-3 rounded-md w-full relative">
              <Routes>
                <Route path="dashboard" element={<Table />} />
                <Route path="/be_instructor" element={<BeInstructor />} />
                <Route path="payment_success" element={<PaymentSucess />} />
                <Route path="my_learnings" element={<MyLearninig />} />
              </Routes>
            </div>
          </div>
        </ContainerLayout>
      )}
    </div>
  );
};

export default UserRoute;
