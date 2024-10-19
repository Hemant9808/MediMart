import React, { useState, useEffect } from "react";

const ShippingInfo = ({ shippingAddress, updateShippingAddress }) => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  // Set initial values from shippingAddress prop when the component mounts
  useEffect(() => {
    if (shippingAddress) {
      setAddress(shippingAddress.address || "");
      setCity(shippingAddress.city || "");
      setPostalCode(shippingAddress.postalCode || "");
      setCountry(shippingAddress.country || "");
    }
  }, [shippingAddress]);
console.log("shippingAddress",shippingAddress);

  // Update shipping address in parent component on form change
  const handleInputChange = () => {
    updateShippingAddress({
      address,
      city,
      postalCode,
      country,
    });
  };

  return (
    <div>
      <div className="p-3 bg-teal-50 rounded-full my-3">
        <h1 className="ml-2 font-semibold text-teal-600 uppercase">Enter Shipping Info</h1>
      </div>
      <div className="px-4">
        <p className="mb-4 italic">
          Enter your delivery address where you want to receive the product.
        </p>
      </div>

      {/* Form without submit button */}
      <form>
        <div className="mb-3 pt-0">
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onBlur={handleInputChange} 
            className="px-3 py-4 my-1 border-b border-teal-300 placeholder-gray-500 text-blueGray-600 relative rounded-lg bg-white text-base shadow outline-none focus:outline-none focus:shadow-outline w-full"
          />
        </div>

        <div className="mb-3 pt-0">
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onBlur={handleInputChange}
            className="px-3 py-4 my-1 border-b border-teal-300 placeholder-gray-500 text-blueGray-600 relative rounded-lg bg-white text-base shadow outline-none focus:outline-none focus:shadow-outline w-full"
          />
        </div>

        <div className="mb-3 pt-0">
          <input
            type="text"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            onBlur={handleInputChange}
            className="px-3 py-4 my-1 border-b border-teal-300 placeholder-gray-500 text-blueGray-600 relative rounded-lg bg-white text-base shadow outline-none focus:outline-none focus:shadow-outline w-full"
          />
        </div>

        <div className="mb-3 pt-0">
          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            onBlur={handleInputChange}
            className="px-3 py-4 my-1 border-b border-teal-300 placeholder-gray-500 text-blueGray-600 relative rounded-lg bg-white text-base shadow outline-none focus:outline-none focus:shadow-outline w-full"
          />
        </div>
      </form>
    </div>
  );
};

export default ShippingInfo;




// import React from "react";

// const ShippingInfo = ({updateShippingAddress,orderDetails}) => {
//   return (
//     <div>
//       <div className="p-3 bg-teal-50 rounded-full my-3">
//         <h1 className="ml-2 font-semibold text-teal-600 uppercase">
//           Enter Shipping Info
//         </h1>
//       </div>
//       <div className="px-4">
//         <p className="mb-4 italic">
//           Enter your delivery address where you get the product. You can also
//           send any other location where you send the products.
//         </p>
//       </div>
//       <form>
//         <div className="mb-3 pt-0">
//           <input
//             type="text"
//             placeholder="Name"
//             className="px-3 py-4 my-1 border-b border-teal-300 placeholder-gray-500 text-blueGray-600 relative tracking-wide rounded-lg bg-white text-base shadow outline-none focus:outline-none focus:shadow-outline w-full"
//           />
//         </div>
//         <div className="mb-3 pt-0">
//           <input
//             type="text"
//             placeholder="Email"
//             className="px-3 py-4 my-1 border-b border-teal-300 placeholder-gray-500 text-blueGray-600 relative  rounded-lg bg-white text-base shadow outline-none focus:outline-none focus:shadow-outline w-full"
//           />
//         </div>
//         <div className="mb-3 pt-0">
//           <input
//             type="text"
//             placeholder="Phone"
//             className="px-3 py-4 my-1 border-b border-teal-300 placeholder-gray-500 text-blueGray-600 relative  rounded-lg bg-white text-base shadow outline-none focus:outline-none focus:shadow-outline w-full"
//           />
//         </div>
//         <div className="mb-3 pt-0">
//           <input
//             type="text"
//             placeholder="Address"
//             className="px-3 py-4 my-1 border-b border-teal-300 placeholder-gray-500 text-blueGray-600 relative  rounded-lg bg-white text-base shadow outline-none focus:outline-none focus:shadow-outline w-full"
//           />
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ShippingInfo;
