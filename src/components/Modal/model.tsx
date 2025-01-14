import React from "react";
import { useUpdateCourseMutation } from "../../redux/features/course/courseApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModuleVideos: React.Dispatch<
    React.SetStateAction<Record<string, string | Record<string, string>[]>[]>
  >;
  setSubmit: React.Dispatch<React.SetStateAction<boolean>>;
};

const Model = ({ setOpen, setModuleVideos, setSubmit }: Props) => {
  const [updateCourse] = useUpdateCourseMutation();
  const navigate = useNavigate();
  return (
    <div>
      <div
        id="alert-additional-content-1"
        className="p-4 mb-4  border  rounded-lg  bg-gray-800 text-blue-400 border-blue-800"
        role="alert"
      >
        <div className="flex items-center">
          <svg
            className="flex-shrink-0 w-4 h-4 me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <h3 className="text-lg font-medium">This is a warning alert</h3>
        </div>
        <div className="mt-2 mb-4 text-sm">
          Once you agree to submit means you wont be able to add or edit the
          course again.
        </div>
        <div className="flex">
          <button
            type="button"
            className=" focus:ring-4 focus:outline-none  font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center flex justify-center items-center bg-yellow-300 text-gray-800 hover:bg-yellow-400 focus:ring-yellow-800"
            onClick={async () => {
              await updateCourse({ submissionStatus: "completed" });
              setOpen(false);
              setModuleVideos([]);
              setSubmit(true);
              toast.success("course has been added");
              navigate("/instructor/mytutorials");
            }}
          >
            Submit
          </button>
          <button
            type="button"
            className=" bg-transparent border  focus:ring-4 focus:outline-none  font-medium rounded-lg text-xs px-3 py-1.5 text-center hover:bg-yellow-300 border-yellow-300 text-yellow-300 hover:text-gray-800 focus:ring-yellow-800"
            data-dismiss-target="#alert-additional-content-4"
            aria-label="Close"
            onClick={() => {
              setOpen(false);
            }}
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};

export default Model;
