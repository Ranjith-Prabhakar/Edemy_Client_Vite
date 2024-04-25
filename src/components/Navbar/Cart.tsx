import { useState } from "react";
import { FaCartPlus } from "react-icons/fa";

// const cartContext = createContext();
const Cart = () => {
  const cartData = [
    { _id: 1, courseName: "mern", price: 5000 },
    { _id: 2, courseName: "mean", price: 4000 },
    { _id: 3, courseName: "django", price: 5000 },
    { _id: 4, courseName: "spring boot", price: 3000 },
  ];
  const [dropDown, setDropDown] = useState(false);
  return (
    <div className="relative cursor-pointer">
      <FaCartPlus
        size={25}
        onClick={() => {
          setDropDown(!dropDown);
        }}
      />
      <div className={`absolute ${dropDown ? "block" : "hidden"}`}>
        {cartData.map((course, index) => (
          <div className="flex justify-between" key={index}>
            <ul>
              <li>{course.courseName}</li>
              <li>{course.price}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
