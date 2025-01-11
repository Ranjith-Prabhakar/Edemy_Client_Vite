import { Route, Routes, useNavigate } from "react-router-dom";
import useGetUser from "../hooks/useGetUser";
import PaymentSucess from "../features/PaymentSucess";
import MyLearninig from "../pages/General/MyLearninig";
import ContainerLayout from "../layouts/ContainerLayout";
import Header from "../layouts/Header";
// import SideBar from "../layouts/SideBar";
import Profile from "../features/Instructor/Table";
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
        <ContainerLayout>
          <Header />
          <div className="400px:h-[85vh] flex justify-start gap-2 mt-1 pb-2">
            {/* <SideBar sideBarData={userSideBar} /> */}
            <div className="flex flex-col item-center justify-center gap-2 h-full overflow-scroll scroll-m-1 bg-c_color-colorOne shadow-md ring-gray-400  p-3 rounded-md w-full relative">
              <Routes>
                <Route
                  path="/profile"
                  element={<Profile sideBarData={userSideBar} />}
                />
                
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
