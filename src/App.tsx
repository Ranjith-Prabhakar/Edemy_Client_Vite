import "./assets/App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/General/Home";
import PageNotFound from "./pages/PageNotFound";
import useGetUser from "./hooks/useGetUser";
import AuthRoute from "./Routes/AuthRoute";
import AdminRoute from "./Routes/AdminRoute";
import InstructorRoute from "./Routes/InstructorRoute";
import UserRoute from "./Routes/UserRoute";
import CourseSinglePage from "./pages/General/CourseSinglePage";
import CategoryPage from "./pages/General/CategoryPage";
import CourseSearchPage from "./pages/General/CourseSearchPage";
import ErrorBoundary from "./components/ErrorBoundry/ErrorBoundry";
import AuthCookieChecker from "./components/AuthCookieChecker/AuthCookieChecker";
import BeInstructor from "./pages/User/BeInstructor";

const App = () => {
  const userName = useGetUser().name;
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/auth/*"
            element={userName ? <Navigate to={"/"} /> : <AuthRoute />}
          />
          <Route path="/google_auth/*" element={<AuthCookieChecker />} />
          <Route path="/user/*" element={<UserRoute />} />
          <Route path="/be_instructor" element={<BeInstructor />} />
          <Route path="/instructor/*" element={<InstructorRoute />} />
          <Route path="/admin/*" element={<AdminRoute />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/course_single_page" element={<CourseSinglePage />} />
          <Route path="/search_course" element={<CourseSearchPage />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
