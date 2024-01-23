"use client"
import { useEffect, useState } from "react";
import StudentVoice from "../../../public/Assets/StudentVoice.png";
type Props = {};

const Testimonial = (props: Props) => {
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
    let interval = setInterval(() => {
      if (testimonialData === testimonials.length - 1) {
        setTestimonialData(0);
      } else {
        setTestimonialData(testimonialData + 1);
      }
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [testimonialData]);

  return (
    <div className="w-[90%] m-auto h-[70vh] rounded-lg">
      <h1 className="text-5xl font-semibold text-center mt-7">
        <span className="text-[#FFD700]"> Our </span>
        Students Voice
      </h1>
      <div className="flex mt-5">
        <div className="w-1/2">
          <img src={StudentVoice} alt="student" className="w-[80%]"></img>
        </div>
        <div className="flex flex-col justify-center w-1/2">
          <p>{testimonials[testimonialData].paragraph}</p>
          <br />
          <h4>Name : {testimonials[testimonialData].name}</h4>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
