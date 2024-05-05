import { useLocation, useNavigate, useParams } from "react-router-dom";
import ContainerLayout from "../../layouts/ContainerLayout";
import CourseCard from "../../components/Card/CourseCard";
import { useEffect, useState } from "react";
import { useGetCourseByCategoryMutation } from "../../redux/features/course/courseApi";
import { ICourse } from "../../redux/interfaces/Course/generalInterface";
import Header from "../../layouts/Header";
import useGetScrollPosition from "../../hooks/useGetScrollPosition";
import { LuListFilter } from "react-icons/lu";
import { FaSortAmountUp } from "react-icons/fa";
import { FaSortAmountDownAlt } from "react-icons/fa";

const CategoryPage = () => {
  const { sort, filter } = useLocation().state;
  const navigate = useNavigate();
  const [dropDown, setDropDown] = useState(false);
  const isScrolled = useGetScrollPosition();
  const { id } = useParams();
  const category = id?.replace(/_/g, " ") as string;
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [data, setData] = useState<ICourse[]>([]);

  const [getCourseByCategory, { data: courseData, isSuccess }] =
    useGetCourseByCategoryMutation();

  useEffect(() => {
    // Reset state and fetch data when category changes
    setPage(1);
    setData([]);
    setLoading(true);

    getCourseByCategory({
      category,
      pageNumber: 1,
      frequency: 10,
      sort,
      filter,
    });
  }, [category, sort, filter]); // Fetch data when category changes

  useEffect(() => {
    if (isSuccess) {
      setData((prevData) => [
        ...prevData,
        ...((courseData?.data as ICourse[]) || []),
      ]);
      setHasMore(courseData?.hasMore as boolean);
      setLoading(false);
    }
  }, [isSuccess]);

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const isAtBottom = scrollTop + windowHeight >= documentHeight;

    if (isAtBottom && !loading && hasMore) {
      setPage((prevPage) => prevPage + 1); // Trigger fetch when reaching bottom
      setLoading(true);
      getCourseByCategory({
        category,
        pageNumber: page + 1, // Increment page number to fetch the next page
        frequency: 10,
        sort,
        filter,
      });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasMore]); // Add/remove scroll event listener when loading or hasMore changes

  return (
    <ContainerLayout>
      <Header isScrolled={isScrolled} />
      <div className="flex justify-between items-center mt-8 px-6">
        <h1 className="capitalize font-bold text-4xl italic pb-2 border-b-2 ms-auto me-auto">
          {category}
        </h1>
        <div className="flex gap-3 ">
          <div
            className="flex relative h-5"
            onMouseEnter={() => setDropDown(!dropDown)}
            onMouseLeave={() => setDropDown(!dropDown)}
          >
            <LuListFilter
              color={"white"}
              className="cursor-pointer"
              title="filter"
            />
            {dropDown && (
              <div className="absolute z-10 top-5 border -left-8 px-5 py-2 rounded-lg">
                <h3
                  className="border-b border-dashed cursor-pointer hover:scale-110 font-bold italic"
                  onClick={() => {
                    navigate(`/category/${id}`, {
                      state: { filter: "price", sort: "A-Z" },
                    });
                  }}
                >
                  Price
                </h3>
                <h3
                  className=" cursor-pointer hover:scale-110 font-bold italic"
                  onClick={() => {
                    navigate(`/category/${id}`, {
                      state: { filter: "date", sort: "A-Z" },
                    });
                  }}
                >
                  Date
                </h3>
              </div>
            )}
          </div>
          {sort === "A-Z" ? (
            <FaSortAmountDownAlt
              className="cursor-pointer"
              title="sort ascending"
              onClick={() => {
                navigate(`/category/${id}`, {
                  state: { filter, sort: "Z-A" },
                });
              }}
            />
          ) : (
            <FaSortAmountUp
              className="cursor-pointer"
              title="sort descending"
              onClick={() => {
                navigate(`/category/${id}`, {
                  state: { filter, sort: "A-Z" },
                });
              }}
            />
          )}
        </div>
      </div>
      <div className="min-h-screen mt-10">
        <div className="flex flex-col justify-center items-center 400px:grid grid-cols-4 gap-2 ">
          {!data.length && !loading && !hasMore ? (
            <div className="w-screen h-screen  flex justify-center items-start mt-44">
              <h1 className="text-4xl font-extrabold text-center">
                No Courses Have Been Registered Under This Category
              </h1>
            </div>
          ) : (
            data.map((item, index) => (
              <CourseCard courseCategory={item} key={item._id + index} />
            ))
          )}
        </div>
        {loading && hasMore && (
          <div role="status" className="flex justify-center mt-10 pb-10">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>
    </ContainerLayout>
  );
};

export default CategoryPage;

