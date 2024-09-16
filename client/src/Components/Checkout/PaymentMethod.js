import React from "react";

const PaymentMethod = () => {
  return (
    <div className="mb-4">
      <div className="p-3 bg-teal-50 rounded-full mb-3">
        <h1 className="ml-2 font-semibold text-teal-600 uppercase">
          Payment Method
        </h1>
      </div>
      <div className="px-4">
        <p className="mb-3 italic">
          You can pay us in a multiple way in our payment gateway system.
        </p>

        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio h-5 w-5 text-gray-600"
            checked
          />
          <span className="ml-2 text-gray-800 font-medium">
            Cash On Delivery
          </span>
        </label>
        <hr />
        <label className="inline-flex items-center mt-2">
          <input type="radio" className="form-radio h-5 w-5 text-gray-600" />
          <span className="ml-2 text-gray-800 font-medium">Pay Online</span>
        </label>
      </div>
    </div>
  );
};

export default PaymentMethod;
