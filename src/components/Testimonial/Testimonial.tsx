import { useEffect, useState } from "react";
import StudentVoice from "../../../public/Assets/StudentVoice.png";

const Testimonial = () => {
  const testimonials = [
    {
      paragraph:
        "Edemy is a game-changer! Its flexible approach accommodates my busy schedule, while interactive lessons and adaptive technology enhance comprehension. The diverse, multimedia-rich content fosters a supportive learning community. With a user-friendly interface and responsive support, Edemy has transformed my education, making it accessible, engaging, and tailored.",
      name: "Tony Stark",
    },
    {
      paragraph:
        "Edemy is a game-changer! Its flexibility suits my busy schedule, interactive lessons, and adaptive tech boost comprehension. Diverse, multimedia-rich content cultivates a supportive learning community. The user-friendly interface and responsive support redefine education, making it accessible, engaging, and personalized.",
      name: "Bruce Wyne",
    },
    {
      paragraph:
        "Edemy is a game-changer! Its flexible approach accommodates my busy schedule, while interactive lessons and adaptive technology enhance comprehension. The diverse, multimedia-rich content fosters a supportive learning community. With a user-friendly interface and responsive support, Edemy has transformed my education, making it accessible, engaging, and tailored.",
      name: "Peter Parker",
    },
    {
      paragraph:
        "Edemy is a game-changer! Its flexibility suits my busy schedule, interactive lessons, and adaptive tech boost comprehension. Diverse, multimedia-rich content cultivates a supportive learning community. The user-friendly interface and responsive support redefine education, making it accessible, engaging, and personalized.",
      name: "Bruce Wyne",
    },
  ];

  const [testimonialData, setTestimonialData] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (testimonialData === testimonials.length - 1) {
        setTestimonialData(0);
      } else {
        setTestimonialData(testimonialData + 1);
      }
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [testimonialData, testimonials.length]);

  return (
    <div className="flex flex-col h-6/3 overflow-hidden mt-[8%]">
      <h1 className=" text-3xl 400px:text-5xl font-bold italic text-center mt-7">
        <span className="text-[#FFD700]"> Our </span>
        Students Voice
      </h1>
      <div className="400px:flex mt-5 h-full">
        <div className="hidden 400px:block w-1/2">
          <img
            src={StudentVoice}
            alt="student"
            className="w-[80%] h-full"
          ></img>
        </div>
        <div className="flex flex-col justify-center 400px:w-1/2 text-xl italic opacity-85">
          <p className="text-center p-2 pb-0">
            {testimonials[testimonialData].paragraph}
          </p>
          <br />
          <h4 className="text-center p-2 pt-0">
            Name : {testimonials[testimonialData].name}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
