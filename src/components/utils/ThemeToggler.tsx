"use client";
import React, { useState, useEffect, ReactNode } from "react";
import { FaMoon } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";

type Props = {};

const ThemeToggler = (props: Props): ReactNode => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const mode = localStorage.getItem("theme");
    if (mode === "dark") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div
      // className="relative w-16 h-8 flex items-center dark:bg-black bg-white rounded-full cursor-pointer p-1"
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? (
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
