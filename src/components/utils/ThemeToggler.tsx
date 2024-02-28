"use client";
import { useState, useEffect, ReactNode } from "react";
import { FaMoon } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";

const ThemeToggler = (): ReactNode => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
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
      onClick={() => {
        if (theme === "light") {
          setTheme("dark");
        } else {
          setTheme("light");
        }
      }}
    >
      {theme === "dark" ? (
        <FaMoon size={20} className="cursor-pointer" />
      ) : (
        <BsSunFill size={20} className="cursor-pointer" />
      )}
    </div>
  );
};

export default ThemeToggler;
