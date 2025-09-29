import Aboutus from "../../../../public/Assets/AboutUs.jpg";

const AboutUs = () => {
  return (
    <div className="flex flex-col-reverse justify-start items-center 400px:flex-row 400px:justify-between 400px:items-start">
      <div className="p-2 400px:p-0 400px:w-[40%] rounded-xl overflow-hidden">
        <img src={Aboutus} className="w-full" alt="about us"></img>
      </div>
      <div className="400px:w-[50%]">
        <h1 className="text-center text-[#FFD700] font-bold text-5xl italic">
          About us
        </h1>
        <p className="p-3 mt-2 400px:p-0 400px:mt-5 leading-7 text-xl italic opacity-85">
          Welcome to our e-learning platform, where knowledge meets convenience.
          Explore a diverse range of courses tailored to your interests and
          goals. Engage in interactive lessons, connect with expert instructors,
          and embark on a personalized learning journey. Elevate your skills,
          anytime, anywhere – because education knows no boundaries. Join us and
          thrive!
        </p>
      </div>
    </div>
  );
};
export default AboutUs;
