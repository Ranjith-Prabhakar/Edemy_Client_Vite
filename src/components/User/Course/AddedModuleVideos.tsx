import React, { useState } from "react";
import { IoIosArrowDropdown } from "react-icons/io";

type Props = {
  moduleVideos: Record<string, string | Record<string, string>[]>[];
};

const AddedModuleVideos = ({ moduleVideos }: Props) => {
  const [moduleView, setModuleView] = useState<number | null>(null);
  const regex = /\/(.*?)-/;

  return (
    <div className="p-5 flex flex-col gap-3">
      {moduleVideos.length > 0 &&
        moduleVideos.map((item, index) => (
          <React.Fragment key={index}>
            <li
              className="flex gap-2 justify-between items-center cursor-pointer border border-white rounded-md p-2 text-white"
              onClick={() => {
                setModuleView((prev) =>
                  prev === index + 1 ? null : index + 1
                );
              }}
            >
              <div>{item?.moduleNo + "."}</div>
              <div>
                {item?.moduleTittle as string} ({item?.videos.length})
              </div>
              <div>
                <IoIosArrowDropdown size={25} />
              </div>
            </li>
            {Array.isArray(item.videos) &&
              moduleView === index + 1 &&
              item.videos.map((video, videoIndex) => (
                <div
                  key={videoIndex}
                  className=" flex justify-between px-4 py-2 dark:bg-c_color-colorSeven cursor-pointer hover:scale-105 transition-all ease duration-300 rounded-sm w-[95%] m-auto"
                >
                  <h4>{video.videoNo}. </h4>
                  <h4>{video.videoTittle.match(regex)?.[1] || "No Match"}</h4>
                  <button className="border border-white rounded-full px-4">
                    Play
                  </button>
                </div>
              ))}
          </React.Fragment>
        ))}
    </div>
  );
};

export default AddedModuleVideos;

// import { IoIosArrowDropdown } from "react-icons/io";
// type Props = {
//   moduleVideos: Record<string, string | Record<string, string>[]>[];
// };

// const AddedModuleVideos = ({ moduleVideos }: Props) => {
//   const regex = /\/(.*?)-/;
//   return (
//     <div className="p-5 flex flex-col gap-3">
//       {moduleVideos.length > 0 &&
//         moduleVideos.map((item, index) => {
//           console.log("item", item);
//           return (
//             <>
//               <li
//                 key={index}
//                 className="flex gap-2 justify-between items-center cursor-pointer border border-white rounded-sm p-2 text-white"
//               >
//                 <div>{item?.moduleNo + "."}</div>
//                 <div>
//                   {item?.moduleTittle as string} ({item?.videos.length})
//                 </div>

//                 <div>
//                   <IoIosArrowDropdown size={25} />
//                 </div>
//               </li>
//               {Array.isArray(item.videos) &&
//                 item.videos.map((video, videoIndex) => (
//                   <div key={videoIndex}>
//                     {video.videoNo} -{" "}
//                     {video.videoTittle.match(regex)?.[1] || "No Match"}
//                   </div>
//                 ))}
//             </>
//           );
//         })}
//     </div>
//   );
// };

// export default AddedModuleVideos;
