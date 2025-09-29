import { useEffect, useState } from "react";

const Testimonial = () => {
  const testimonials = [
    {
      paragraph:
        "Edemy completely changed how I study. The structured lessons and interactive exercises keep me engaged, and I finally feel confident learning complex topics at my own pace.",
      name: "Sara",
      image: "../../../public/Assets/testimonial-1.png",
    },
    {
      paragraph:
        "What I love most about Edemy is the flexibility. I can log in anytime, from anywhere, and continue exactly where I left off. It makes learning so much easier alongside my busy work schedule.",
      name: "Natasha",
      image: "../../../public/Assets/testimonial-2.png",
    },
    {
      paragraph:
        "The instructors are amazing! Their clear explanations and real-world examples helped me understand subjects I struggled with for years. I’m finally seeing real progress in my studies.",
      name: "Peter",
      image: "../../../public/Assets/testimonial-3.png",
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
    }, 3000);

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
      <div className="400px:flex mt-[50px] p-[15px] h-[400px] bg-white/5 backdrop-blur-md shadow-2xl overflow-hidden w-[80%] m-auto border rounded-xl">
        <div className="hidden 400px:block w-1/2">
          <img
            src={testimonials[testimonialData].image}
            alt="student"
            className="w-[300px] h-[300px] object-cover rounded-xl mx-auto mt-3 "
          ></img>
        </div>
        <div className="flex flex-col justify-center 400px:w-1/2 text-xl italic opacity-85">
          <p className=" p-2 pb-0">{testimonials[testimonialData].paragraph}</p>
          <br />
          <h4 className="text-end p-2 pt-0">
            Name : {testimonials[testimonialData].name}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
