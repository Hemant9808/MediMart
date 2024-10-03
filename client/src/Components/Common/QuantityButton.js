import React from "react";

const QuantityButton = ({ quantity, setQuantity }) => {
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
    console.log(quantity);
  };
  const decreaseQuantity = () => {
    console.log("decreaseQuantity");

    if (quantity > 1) setQuantity(quantity - 1); // Ensure quantity doesn't go below 1
  };
  return (
    <div
      className="flex justify-between align-center items-center rounded w-32 h-12 r text-base sm:text-lg font-medium tracking-wide leading-6 transition duration-150 ease-in-out border border-teal-400 focus:outline-none md:w-40"
      
    >
      <div>
        <i className="fas fa-minus m-1 py-2 px-4 cursor-pointer font-normal text-teal-600" onClick={decreaseQuantity}></i>
      </div>
      <span className="mx-2 text-center w-2 text-gray-900 md:w-8 font-medium">
        {quantity}
      </span>

      <i
        className="fas fa-plus m-1 py-2 px-4 cursor-pointer font-normal text-teal-600"
        onClick={increaseQuantity}
      ></i>
    </div>
  );
};

export default QuantityButton;
