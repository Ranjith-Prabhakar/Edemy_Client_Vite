import { Route, Routes, useNavigate } from "react-router-dom";
import useGetUser from "../hooks/useGetUser";
import PaymentSucess from "../features/PaymentSucess";
import MyLearninig from "../pages/General/MyLearninig";
import Header from "../layouts/Header";
import { instructorSideBar } from "../data/InstructorSideBar";
// import SideBar from "../layouts/SideBar";
import Table from "../features/Instructor/Table";
import Courses from "../features/Instructor/Course/Courses";
import MyTutorials from "../features/Instructor/Tutorials/MyTutorials";
import ContainerLayout from "../layouts/ContainerLayout";

const InstructorRoute = () => {
  const user = useGetUser();
  const navigate = useNavigate();
  if (!user.name) {
    navigate("/auth/login");
  }
  return (
    <div>
      {user.role === "instructor" && (
        <ContainerLayout>
          <Header />
          <div className="h-[87vh] flex justify-start mt-1 gap-2 pb-3">
            {/* <SideBar sideBarData={instructorSideBar} /> */}
            <div className="flex flex-col gap-2 h-full overflow-scroll scroll-m-1 dark:bg-c_color-colorOne shadow-md ring-gray-400   rounded-md w-full relative ">
              <Routes>
                <Route
                  path="dashboard"
                  element={<Table sideBarData={instructorSideBar} />}
                />
                <Route path="addcourses" element={<Courses />} />
                <Route path="mytutorials" element={<MyTutorials />} />
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

export default InstructorRoute;
