import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";

import { useForgotPassword } from "./hook";
import { SpinnerButton } from "../../../components/Buttons/SpinnerButton";
import GeneralButton from "../../../components/Buttons/GeneralButton";

const ForgotPassword = () => {
  const {
    loading,
    values,
    errors,
    touched,
    navigate,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForgotPassword();

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full  rounded-lg shadow-lg  md:mt-0 sm:max-w-md xl:p-0 bg-[#063134] ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl ">
                Forgot Password
              </h1>
              <div className="flex justify-center items-center gap-3">
                {" "}
                <Link to={"/"}>
                  <IoHome />
                </Link>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium "
                >
                  Your email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className=" border border-gray-300  text-black sm:text-sm rounded-lg focus:ring-[#69D3DC] focus:border-[#69D3DC] block w-full p-2.5 bg-[#b7e2e6]  placeholder-gray-400   "
                  placeholder="name@company.com"
                />
                {errors.email && touched.email && (
                  <p className="text-red-600">{errors.email}</p>
                )}
              </div>
              {loading ? (
                <SpinnerButton status="Validating Data" />
              ) : (
                <GeneralButton type="submit" disabled={isSubmitting}>
                  Submit
                </GeneralButton>
              )}
            </form>
            <button
              className="w-full focus:ring-1 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-[#008E80] hover:bg-[#009B7D] "
              onClick={(e) => {
                e.preventDefault();
                navigate("/auth/login");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
