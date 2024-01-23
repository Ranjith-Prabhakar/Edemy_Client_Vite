"use client";
import React, { useState } from "react";
import slider1 from "../../../public/Assets/slider1.jpg";
import slider2 from "../../../public/Assets/slider2.jpg";
import slider3 from "../../../public/Assets/slider3.jpg";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { IoChevronForwardCircleOutline } from "react-icons/io5";
type Props = {};

const Slider = (props: Props) => {
  const images = [slider1, slider2, slider3];
  const [count, setCount] = useState(0);
  return (
    <>
      <div className="flex my-[80px] h-[70vh] max-w-[90%] w-full m-auto rounded-lg gap-5 overflow-hidden relative">
        <div className="w-full">
          <img
            src={images[count]}
            alt="slider"
            className="w-full h-full object-cover object-top"
          />
        </div>

        <IoChevronBackCircleOutline
          className="text-[#FFD700] absolute left-2 top-1/2"
          size={40}
          onClick={() => {
            if (count === 0) {
              setCount(images.length - 1);
            } else {
              setCount(count - 1);
            }
          }}
        />
        <IoChevronForwardCircleOutline
          className="text-[#FFD700] absolute right-2 top-1/2"
          size={40}
          onClick={() => {
            if ((count + 1) % 3 === 0) {
              setCount(0);
            } else {
              setCount(count + 1);
            }
          }}
        />
      </div>
    </>
  );
};

export default Slider;
