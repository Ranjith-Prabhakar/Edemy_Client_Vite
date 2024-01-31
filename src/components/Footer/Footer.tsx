import logo from "../../../public/Assets/Logo.png";
import { CgMail } from "react-icons/cg";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="flex max-w-[90%] w-full mx-auto justify-between mt-[110px] mx-2 border-t-[1px] border-[#FFD700] py-6">
      <div className="flex flex-col ms-2">
        <Link to={"/home"}>
          <img src={logo} alt="Logo image" className="w-[100px] h-[80px]" />
        </Link>
        <h5 className="text-[#FFD700]">Follow Us On Social Media</h5>
        <div className="flex gap-2 items-center mt-2">
          <CgMail size={25} color="#FFD700" className="cursor-pointer" />
          <FaFacebook size={25} color="#FFD700" className="cursor-pointer" />
          <FaInstagram size={25} color="#FFD700" className="cursor-pointer" />
          <FaLinkedin size={25} color="#FFD700" className="cursor-pointer" />
        </div>
      </div>

      <div className="flex flex-col text-[#FFD700] ms-3 gap-3">
        <h5 className="font-extrabold text-xl">Explore</h5>
        <p className="font-extralight cursor-pointer">Home</p>
        <p className="font-extralight cursor-pointer">About Us</p>
        <h6 className="font-extralight cursor-pointer">Courses</h6>
        <h6 className="font-extralight cursor-pointer">Policies</h6>
      </div>
      <div className="flex flex-col text-[#FFD700] ms-3 gap-4">
        <h5 className="font-extrabold text-xl">Get In Touch</h5>
        <h6 className="font-extralight ">Address: Bangalore,India</h6>
        <h6 className="font-extralight">Phone:1234567890</h6>
        <h6 className="font-extralight cursor-pointer">
          Email:edemy@gmail.com
        </h6>
      </div>
      <div className="flex flex-col"></div>
    </div>
  );
};

export default Footer;
