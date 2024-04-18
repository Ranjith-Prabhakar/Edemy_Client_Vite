import { IoIosArrowDropdown } from "react-icons/io";
type Props = {
  moduleVideos: Record<string, string | Record<string, string>[]>[];
};

const AddedModuleVideos = ({ moduleVideos }: Props) => {
  
  const courseName = (videoTittle: string) => {
    const lastDashIndex = videoTittle.lastIndexOf("-");
    const lastSlashIndex = videoTittle.lastIndexOf("/");
    const extractedString =videoTittle.substring(
      lastSlashIndex + 1,
      lastDashIndex
    );
    return extractedString;
  };
  return (
    <div className="p-5 flex flex-col gap-3">
      {moduleVideos.length > 0 &&
        moduleVideos.map((item, index) => {
          console.log("item", item);
          return (
            <>
              <li
                key={index}
                className="flex gap-2 justify-between items-center cursor-pointer border border-white rounded-sm p-2 text-white"
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
                item.videos.map((video, videoIndex) => (
                  <div key={videoIndex}>
                    {video.videoNo} -{" "}
                    { courseName(video.videoTittle)||
                      "No Match"}
                  </div>
                ))}
            </>
          );
        })}
    </div>
  );
};

export default AddedModuleVideos;

