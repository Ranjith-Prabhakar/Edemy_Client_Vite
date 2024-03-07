const FileInput = () => {
  return (
    <div>
      <input
        className="bg-gray-50 border border-gray-300 text-black dark:text-black sm:text-sm rounded-lg focus:ring-c_color-colorTwo focus:border-c_color-colorTwo block w-full p-2.5 dark:bg-c_color-colorThree dark:placeholder-gray-400"
        aria-describedby="file_input_help"
        id="file_input"
        type="file"
      />
    </div>
  );
};

export default FileInput;
