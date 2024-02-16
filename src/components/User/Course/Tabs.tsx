type Props = { setStepper: React.Dispatch<React.SetStateAction<number>> };

const Tabs = ({ setStepper }: Props) => {
  return (
    <div className="flex gap-2 justify-around justify-center p-5">
      <button
        className="bg-gray-500 rounded-md px-5 text-black font-bold py-1"
        onClick={() => {
          setStepper(1);
        }}
      >
        Add Course Data
      </button>
      <button
        className="bg-gray-500 rounded-md px-5 text-black font-bold py-1"
        onClick={() => {
          setStepper(2);
        }}
      >
        Add Modules
      </button>
      <button className="bg-gray-500 rounded-md px-5 text-black font-bold py-1">
        Submit
      </button>
    </div>
  );
};

export default Tabs;

// type Props = { setStepper: React.Dispatch<React.SetStateAction<number>> };

// const Tabs = ({ setStepper }: Props) => {
//   return (
//     <div className="flex gap-2 justify-around justify-center p-5">
//       <button
//         className="bg-gray-500 rounded-md px-5 text-black font-bold py-1"
//         onClick={() => {
//           setStepper(1);
//         }}
//       >
//         Add Course Data
//       </button>
//       <button
//         className="bg-gray-500 rounded-md px-5 text-black font-bold py-1"
//         onClick={() => {
//           setStepper(2);
//         }}
//       >
//         Add Modules
//       </button>
//       <button className="bg-gray-500 rounded-md px-5 text-black font-bold py-1">
//         Submit
//       </button>
//     </div>
//   );
// };

// export default Tabs;
