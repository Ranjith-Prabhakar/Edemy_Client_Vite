import { useEffect, useState } from "react";
import useGetUser from "../hooks/useGetUser";
import { ICategory } from "../redux/interfaces/Course/getCategories";
import { useGetCategoryQuery } from "../redux/features/course/courseApi";
import useInitialNotificationLoader from "../hooks/useInitialNotificationLoader";
import Brand from "../components/Navbar/Brand";
import Search from "../components/Navbar/Search";
import HamburgerMenu from "../components/Navbar/HamburgerMenu";
import Notification from "../components/Navbar/Notification";
import ProfileDropDown from "../components/ProfileDropDown/ProfileDropDown";

type props = {
  isScrolled?: boolean;
};
const Header = ({ isScrolled }: props) => {
  const userData = useGetUser();
  useInitialNotificationLoader();
  const { data, isSuccess } = useGetCategoryQuery();
  const [categoryList, addCategoryList] = useState<ICategory[]>([]);

  useEffect(() => {
    if (isSuccess) {
      addCategoryList(data.data as ICategory[]);
    }
  }, [isSuccess]);

  return (
    <>
      <div
        className={`w-full sticky top-0 rounded-b-3xl z-50 text-xl p-5 ${
          isScrolled
            ? "bg-white/5 backdrop-blur-md shadow-2xl opacity-0 hover:opacity-100"
            : "bg-transparent "
        }`}
      >
        <div className="flex justify-between items-end ">
          <Brand />
          <Search isScrolled={isScrolled} categoryList={categoryList} />
          <div>
            <HamburgerMenu />
            <div className="hidden 1200px:flex justify-center items-center gap-4">
              {userData.name && (
                <>
                  <Notification />
                </>
              )}

              <ProfileDropDown />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
