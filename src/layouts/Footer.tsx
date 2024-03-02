import { CgMail } from "react-icons/cg";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="mt-[8%] flex flex-col text-xl">
      <hr className="w-full h-1 mb-5" />
      <div className=" flex justify-between w-full">
        <div className="flex flex-col ms-2">
          <Link to={"/"}>
            <h1 className=" text-2xl font-bold italic ">
              <span className="text-4xl font-bold">E</span>demy
            </h1>
          </Link>
          <h5>Follow Us On Social Media</h5>
          <div className="flex gap-2 items-center mt-2">
            <CgMail
              size={25}
              className="cursor-pointer hover:scale-150 hover:opacity-75"
            />
            <FaFacebook
              size={25}
              className="cursor-pointer hover:scale-150 hover:opacity-75"
            />
            <FaInstagram
              size={25}
              className="cursor-pointer hover:scale-150 hover:opacity-75"
            />
            <FaLinkedin
              size={25}
              className="cursor-pointer hover:scale-150 hover:opacity-75"
            />
          </div>
        </div>

        <div className="flex flex-col ms-3 gap-1">
          <h5 className="text-2xl font-bold italic">Explore</h5>
          <p className="font-extralight cursor-pointer italic hover:font-bold">
            Home
          </p>
          <p className="font-extralight cursor-pointer italic hover:font-bold">
            About Us
          </p>
          <h6 className="font-extralight cursor-pointer italic hover:font-bold">
            Courses
          </h6>
          <h6 className="font-extralight cursor-pointer italic hover:font-bold">
            Policies
          </h6>
        </div>
        <div className="flex flex-col ms-3 gap-1">
          <h5 className="text-2xl font-bold italic">Get In Touch</h5>
          <h6 className="font-extralight italic">Address: Bangalore,India</h6>
          <h6 className="font-extralight italic">Phone:1234567890</h6>
          <h6 className="font-extralight cursor-pointer italic">
            Email:edemy@gmail.com
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Footer;
