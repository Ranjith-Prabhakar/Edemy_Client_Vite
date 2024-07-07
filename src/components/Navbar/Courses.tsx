import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ICategory } from "../../redux/interfaces/Course/getCategories";
import { useGetCategoryQuery } from "../../redux/features/course/courseApi";

const Courses = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { data, isSuccess } = useGetCategoryQuery();
  const [categoryList, addCategoryList] = useState<ICategory[]>([]);
  useEffect(() => {
    if (isSuccess) {
      addCategoryList(data.data as ICategory[]);
    }
  }, [isSuccess]);

  return (
    <div
      className="relative w-[20%] hidden 800px:block 1200px:block"
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
        }  w-[300px] text-md`}
      >
        <li
          className="cursor-pointer rounded-xl capitalize italic font-normal hover:scale-110 bg-c_color-colorSeven mb-1 px-5"
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
              className="cursor-pointer rounded-xl capitalize italic font-normal hover:scale-110 bg-c_color-colorSeven mb-1 px-5"
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
  );
};

export default Courses;
// -----------------------------------------------
type MobileProps = {
  setHamburgerDropDown: React.Dispatch<React.SetStateAction<boolean>>;
};
const MobileCourses = ({ setHamburgerDropDown }: MobileProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { data, isSuccess } = useGetCategoryQuery();
  const [categoryList, addCategoryList] = useState<ICategory[]>([]);
  useEffect(() => {
    console.log("inside the categorty", data);
    if (isSuccess) {
      addCategoryList(data.data as ICategory[]);
    }
  }, [isSuccess]);

  return (
    <div
      className="relative w-[20%]  400px:block 1200px:block"
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
        }  w-[300px] text-md`}
      >
        <li
          className="cursor-pointer rounded-xl capitalize italic font-normal hover:scale-110 bg-c_color-colorSeven mb-1 px-5"
          onClick={() => {
            navigate("/category/all_category", {
              state: { sort: "A-Z", filter: "date" },
            });
            setHamburgerDropDown(false);
          }}
        >
          All Category
        </li>
        {categoryList &&
          categoryList.map((item, index) => (
            <li
              className="cursor-pointer rounded-xl capitalize italic font-normal hover:scale-110 bg-c_color-colorSeven mb-1 px-5"
              onClick={() => {
                navigate(
                  `/category/${item.name
                    .toLocaleLowerCase()
                    .replace(/\s/g, "_")}`,
                  {
                    state: { sort: "A-Z", filter: "date" },
                  }
                );
                setHamburgerDropDown(false);
              }}
              key={index}
            >
              {item.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export { MobileCourses };
