import React from "react";

const ShippingInfo = () => {
  return (
    <div>
      <div className="p-3 bg-teal-50 rounded-full my-3">
        <h1 className="ml-2 font-semibold text-teal-600 uppercase">
          Enter Shipping Info
        </h1>
      </div>
      <div className="px-4">
        <p className="mb-4 italic">
          Enter your delivery address where you get the product. You can also
          send any other location where you send the products.
        </p>
      </div>
      <form>
        <div className="mb-3 pt-0">
          <input
            type="text"
            placeholder="Name"
            className="px-3 py-4 my-1 border-b border-teal-300 placeholder-gray-500 text-blueGray-600 relative tracking-wide rounded-lg bg-white text-base shadow outline-none focus:outline-none focus:shadow-outline w-full"
          />
        </div>
        <div className="mb-3 pt-0">
          <input
            type="text"
            placeholder="Email"
            className="px-3 py-4 my-1 border-b border-teal-300 placeholder-gray-500 text-blueGray-600 relative  rounded-lg bg-white text-base shadow outline-none focus:outline-none focus:shadow-outline w-full"
          />
        </div>
        <div className="mb-3 pt-0">
          <input
            type="text"
            placeholder="Phone"
            className="px-3 py-4 my-1 border-b border-teal-300 placeholder-gray-500 text-blueGray-600 relative  rounded-lg bg-white text-base shadow outline-none focus:outline-none focus:shadow-outline w-full"
          />
        </div>
        <div className="mb-3 pt-0">
          <input
            type="text"
            placeholder="Address"
            className="px-3 py-4 my-1 border-b border-teal-300 placeholder-gray-500 text-blueGray-600 relative  rounded-lg bg-white text-base shadow outline-none focus:outline-none focus:shadow-outline w-full"
          />
        </div>
      </form>
    </div>
  );
};

export default ShippingInfo;
