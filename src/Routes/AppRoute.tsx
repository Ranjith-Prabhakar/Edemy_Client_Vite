import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/General/Home";
import useGetUser from "../hooks/useGetUser";
import { Toaster } from "react-hot-toast";
import { lazy, Suspense } from "react";

const PageNotFound = lazy(() => import("../pages/PageNotFound"));
const AuthRoute = lazy(() => import("../Routes/AuthRoute"));
const AdminRoute = lazy(() => import("../Routes/AdminRoute"));
const InstructorRoute = lazy(() => import("../Routes/InstructorRoute"));
const UserRoute = lazy(() => import("../Routes/UserRoute"));
const CourseSinglePage = lazy(
  () => import("../pages/General/CourseSinglePage")
);
const CategoryPage = lazy(() => import("../pages/General/CategoryPage"));
const CourseSearchPage = lazy(
  () => import("../pages/General/CourseSearchPage")
);
const AuthCookieChecker = lazy(
  () => import("../components/AuthCookieChecker/AuthCookieChecker")
);
const BeInstructor = lazy(() => import("../pages/User/BeInstructor"));

const AppRoute = () => {
  const userName = useGetUser().name;
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="h-screen w-screen flex justify-center items-center font-bold font-roboto text-2xl">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/auth/*"
            element={userName ? <Navigate to={"/"} /> : <AuthRoute />}
          />

          <Route path="/google_auth/*" element={<AuthCookieChecker />} />
          {/** need too work on  */}
          <Route path="/user/*" element={<UserRoute />} />
          <Route path="/be_instructor" element={<BeInstructor />} />
          <Route path="/instructor/*" element={<InstructorRoute />} />
          <Route path="/admin/*" element={<AdminRoute />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/course_single_page" element={<CourseSinglePage />} />
          <Route path="/search_course" element={<CourseSearchPage />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#333",
              color: "#fff",
              zIndex: 9999,
            },
          }}
        />
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoute;
