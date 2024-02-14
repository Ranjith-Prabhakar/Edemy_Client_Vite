
type Props = {
  moduleList: {
    [key: string]: string | number;
  }[];
};

const AddedModuleVideos = ({ moduleList }: Props) => {
  return (
    <div className="p-5 flex flex-col gap-3">
      {moduleList.length > 0 &&
        moduleList.map((item, index) => (
          <li
            key={index}
            className="flex gap-2 justify-between items-center cursor-pointer border border-white rounded-sm p-2 text-white"
          >
            <div>{item?.moduleNo + "."}</div>
            <div>{item?.moduleName}</div>
            <div>
              <button className="bg-slate-500 px-5 text-black font-bold">
                Watch
              </button>
            </div>
          </li>
        ))}
    </div>
  );
};

export default AddedModuleVideos