"use client";
import { useState, useEffect, ReactNode } from "react";
import { FaMoon } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";

type Props = {};

const ThemeToggler = (props: Props): ReactNode => {
  const [theme, setTheme] = useState("light");

  // useEffect(() => {
  //   const mode = localStorage.getItem("theme");
  //   if (mode === "dark") {
  //     setTheme("dark");
  //   }
  // }, []);

  // checking browser schema and acting with that
  useEffect(() => {
    if(window.matchMedia('(prefers-color-scheme:dark)').matches){
      setTheme("dark")
    }else{
      setTheme("light")
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return (
    <div
      // className="relative w-16 h-8 flex items-center dark:bg-black bg-white rounded-full cursor-pointer p-1"
      onClick={() => {
        if (theme === "light") {
          setTheme("dark");
        } else {
          setTheme("light");
        }
      }}
    >
      {theme === "dark" ? (
        <FaMoon className="text-[#FFD700]" size={20} color="#FFD700" />
      ) : (
        <BsSunFill className="text-black" size={20} />
      )}

      {/* <div
        className="absolute bg-white dark:bg-slate-50 w-6 h-6 rounded-full shadow-md transform transition-transform duration-300"
        style={darkMode ? { left: "2px" } : { right: "2px" }}
      ></div> */}
    </div>
  );
};

export default ThemeToggler;
