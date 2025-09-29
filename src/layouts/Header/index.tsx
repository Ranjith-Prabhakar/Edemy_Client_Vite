import Brand from "../../features/Header/Brand";
import Search from "../../features/Header/Search";
import HamburgerMenu from "../../features/Header/HamburgerMenu";
import Notification from "../../features/Header/Notification";
import ProfileDropDown from "../../features/Header/ProfileDropDown";
import { useHeaderHook } from "./hook";
import Courses from "../../features/Header/Courses";

type props = {
  isScrolled?: boolean;
};
const Header = ({ isScrolled }: props) => {
  const { userData, categoryList } = useHeaderHook();

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
          <Courses />
          <Search categoryList={categoryList} />
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
