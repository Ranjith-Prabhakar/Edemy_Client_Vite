type Props = {
  courseName: string;
  Description: string;
  Duration: string;
  Instructor: string;
};

const About = ({ courseName, Description, Duration, Instructor }: Props) => {
  return (
    <div className="dark:bg-c_color-colorSix p-3 rounded-b-md w-full">
      <h1 className="capitalize text-4xl font-bold mb-3 mt-1">{courseName}</h1>
      <h1 className="capitalize text-md font-light text-slate-300 mb-3 italic">
        {Description}
      </h1>
      <h1 className="capitalize text-sm font-bold mb-3">
        Duration : {Duration}hrs
      </h1>
      <h1 className="capitalize text-sm font-bold mb-3">
        Instructor : {Instructor}
      </h1>
    </div>
  );
};

export default About;
