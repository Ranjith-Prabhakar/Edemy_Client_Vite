import { Link, useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import ThemeToggler from "../components/utils/ThemeToggler";
import { useEffect, useState } from "react";
import useGetUser from "../hooks/useGetUser";
import { ICategory } from "../redux/interfaces/Course/getCategories";
import {
  useGetCategoryQuery,
} from "../redux/features/course/courseApi";
import { catchError } from "../utils/catchError";
type props = {
  isScrolled?: boolean;
};
const Header = ({ isScrolled }: props) => {
  const userData = useGetUser();
  const [name, setName] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const { data, isSuccess } = useGetCategoryQuery();
  const [categoryList, addCategoryList] = useState<ICategory[]>([]);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    if (userData.name) {
      setName(
        userData.name.substring(0, 1)[0].toUpperCase() +
          userData.name.substring(1, 2)
      );
    }
  }, [userData]);

  useEffect(() => {
    if (isSuccess) {
      addCategoryList(data.data as ICategory[]);
    }
  }, [isSuccess]);

  const handleSearch = async (key: string) => {
    try {
      if (
        categoryList.length &&
        categoryList.some(
          (category: ICategory) =>
            category.name.toLowerCase() === key.toLowerCase()
        )
      ) {
        navigate(`/category/${key.toLocaleLowerCase().replace(/\s/g, "_")}`, {
          state: { sort: "A-Z", filter: "date" },
        });
      } else {
        navigate("/search_course", {
          state: {
            queryData: {
              key,
              sort: "A-Z",
              filter: "date",
            },
          },
        });
      }
    } catch (error) {
      catchError(error);
    }
  };

  return (
    <div
      className={`sticky top-0 rounded-b-3xl z-50 text-xl p-5 ${
        isScrolled ? "bg-c_color-colorOne shadow-2xl " : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-end">
        <div className="flex items-end  gap-4">
          <Link to={"/"}>
            <h1 className=" text-2xl font-bold italic ">
              <span className="text-4xl font-bold">E</span>demy
            </h1>
          </Link>
        </div>
        <div
          className="relative w-[20%] "
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
        >
          <h1 className="cursor-pointer">Courses</h1>
          <ul
            className={`absolute ${
              isHovered ? "block leading-10 pt-3" : "hidden"
            } `}
          >
            <li
              className="cursor-pointer min-w-fit rounded-xl capitalize italic font-normal hover:scale-110 bg-c_color-colorSeven mb-1 px-5"
              onClick={() =>
                navigate("/category/all_category", {
                  state: { sort: "A-Z", filter: "date" },
                })
              }
            >
              All Category
            </li>
            {categoryList &&
              categoryList.map((item, index) => (
                <li
                  className="cursor-pointer min-w-fit rounded-xl capitalize italic font-normal hover:scale-110 bg-c_color-colorSeven mb-1 px-5"
                  onClick={() =>
                    navigate(
                      `/category/${item.name
                        .toLocaleLowerCase()
                        .replace(/\s/g, "_")}`,
                      {
                        state: { sort: "A-Z", filter: "date" },
                      }
                    )
                  }
                  key={index}
                >
                  {item.name}
                </li>
              ))}
          </ul>
        </div>
        <div>
          <input
            className={`rounded-full w-96 h-[35px] px-7 outline-none font-semibold ${
              isScrolled
                ? "dark:bg-slate-50 placeholder:text-black dark:text-black"
                : "dark:bg-slate-400 focus:border-1 focus:border-white placeholder:text-black dark:text-black"
            }  focus:border-1 focus:border-white `}
            type="search"
            placeholder="search...."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch(searchValue);
            }}
          />
        </div>
        <div className="flex justify-center items-center gap-4">
          <div className="flex flex-1 justify-end ">
            <ThemeToggler />
          </div>
          {userData.name &&
            userData.role !== "instructor" &&
            userData.role !== "admin" && (
              <Link to={"/user/be_instructor"}>Teach on Edemy</Link>
            )}
          {userData.name && (
            <>
              {userData.role !== "admin" && (
                <Link to={`/${userData.role}/my_learnings`}>My Learnings</Link>
              )}

              <Link to={"/categories"}>
                <FaRegHeart size={25} />
              </Link>
              <Link to={"/be_instructor"}>
                <FaCartPlus size={25} />
              </Link>
              <Link to={"/be_instructor"}>
                <IoIosNotifications size={25} />
              </Link>
            </>
          )}

          {userData.role === "admin" && (
            <Link to={`/admin/dash_bord`}>
              <div className="rounded-full flex justify-center items-center w-[35px] h-[35px] bg-white text-[#09616A]">
                <h1 className=" font-bold">{name}</h1>
              </div>
            </Link>
          )}

          {userData.role === "instructor" && (
            <Link to={`/instructor/profile`}>
              <div className="rounded-full flex justify-center items-center w-[35px] h-[35px] bg-white text-[#09616A]">
                <h1 className=" font-bold">{name}</h1>
              </div>
            </Link>
          )}

          {userData.role === "user" && (
            <Link to={`/user/profile`}>
              <div className="rounded-full flex justify-center items-center w-[35px] h-[35px] bg-white text-[#09616A]">
                <h1 className=" font-bold">{name}</h1>
              </div>
            </Link>
          )}

          {!userData.role && (
            <Link to={"/auth/login"}>
              <CgProfile size={35} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
