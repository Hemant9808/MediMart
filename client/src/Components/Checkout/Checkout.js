
import React, { useState } from "react";
import PaymentMethod from "./PaymentMethod";
import OrderDetails from "./OrderDetails";
import CouponCode from "./CouponCode";
import ShippingInfo from "./ShippingInfo";

const CartProduct = [
  {
    id: 1,
    name: "Stomach Medicine",
    category: "Structural (Fabrication)",
    imageUrl:
      "https://wpbingosite.com/wordpress/fuho/wp-content/uploads/2020/12/Image-26-1-480x480.jpg",
    quantity: 1,
    unitPrice: 10.0,
    totalPrice: 20.0,
  },
  {
    id: 2,
    name: "Birth Control Pills",
    category: "Overhead Doors",
    imageUrl:
      "https://wpbingosite.com/wordpress/fuho/wp-content/uploads/2021/04/Image-24-480x480.jpg",
    quantity: 2,
    unitPrice: 9600.01,
    totalPrice: 19800.03,
  },
  {
    id: 3,
    name: "Vitamin C Medicine",
    category: "Framing (Wood)",
    imageUrl:
      "https://wpbingosite.com/wordpress/fuho/wp-content/uploads/2020/12/Image-36-1-480x480.jpg",
    quantity: 1,
    unitPrice: 1.5,
    totalPrice: 7.5,
  },
];

const Checkout = () => {
  const [cartProduct, setCartProduct] = useState(CartProduct);

  // Function to increase quantity
  const increaseQuantity = (id) => {
    const newCart = cartProduct.map((product) => {
      if (product.id === id) {
        const newQuantity = product.quantity + 1;
        const newTotalPrice = newQuantity * product.unitPrice;
        return {
          ...product,
          quantity: newQuantity,
          totalPrice: newTotalPrice, // Update the total price
        };
      }
      return product;
    });
    setCartProduct(newCart);
  };

  // Function to decrease quantity
  const decreaseQuantity = (id) => {
    const newCart = cartProduct.map((product) => {
      if (product.id === id && product.quantity > 1) {
        const newQuantity = product.quantity - 1;
        const newTotalPrice = newQuantity * product.unitPrice;
        return {
          ...product,
          quantity: newQuantity,
          totalPrice: newTotalPrice, // Update the total price
        };
      }
      return product;
    });
    setCartProduct(newCart);
  };

  // Function to remove product
  const removeProduct = (id) => {
    const newCart = cartProduct.filter((product) => product.id !== id);
    setCartProduct(newCart);
  };

  return (
    <div className="flex justify-center my-6">
      <div className="flex flex-col w-full p-8 text-gray-800 bg-white pin-r pin-y md:w-4/5 lg:w-4/5">
        <div className="flex-1">
          <table className="w-full text-sm lg:text-base" cellSpacing="0">
            <thead>
              <tr className="h-12 font-sans text-gray-800 text-lg border border-teal-300 border-t-0 border-l-0 border-r-0">
                <th className="hidden text-left md:table-cell font-medium text-teal-600">
                  Product Image
                </th>
                <th className="text-left font-medium text-teal-600">
                  Product Details
                </th>
                <th className="text-left pl-5 lg:pl-8">
                  <span className="inline font-medium text-teal-600">
                    Quantity
                  </span>
                </th>
                <th className="text-right lg:text-left md:table-cell font-medium text-teal-600">
                  Remove
                </th>
                <th className="hidden text-right md:table-cell font-medium text-teal-600">
                  Unit price
                </th>
                <th className="text-right font-medium text-teal-600">
                  Total price
                </th>
              </tr>
            </thead>
            <tbody>
              {cartProduct.map((product) => (
                <tr key={product.id}>
                  <td className="hidden pb-4 md:table-cell">
                    <a href="#0">
                      <img
                        src={product.imageUrl}
                        className="w-20 rounded"
                        alt={product.name}
                      />
                    </a>
                  </td>
                  <td>
                    <a href="#0">
                      <p className="mb-2">{product.name}</p>
                      <form action="" method="POST">
                        <button type="submit" className="text-gray-700">
                          <small>{product.category}</small>
                        </button>
                      </form>
                    </a>
                  </td>
                  <td className="justify-center md:justify-end md:flex md:mt-8">
                    <div className="flex-1 flex items-end justify-between text-sm">
                      <div className="border border-gray-400 rounded flex items-center">
                        <i
                          className="fa-regular fa-plus m-1 py-1 px-2 cursor-pointer font-semibold text-teal-600"
                          onClick={() => increaseQuantity(product.id)}
                        ></i>
                        <input
                          className="mx-2 text-center w-12 font-medium text-gray-800"
                          type="text"
                          value={product.quantity || "0"}
                          readOnly
                        />
                        <i
                          className="fa-regular fa-minus m-1 py-1 px-2 cursor-pointer font-semibold text-teal-600"
                          onClick={() => decreaseQuantity(product.id)}
                        ></i>
                      </div>
                    </div>
                  </td>
                  <td className="text-right px-5 md:table-cell">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-700 cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      onClick={() => removeProduct(product.id)}  //Remove product on click
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </td>
                  <td className="hidden text-right md:table-cell">
                    <span className="text-sm lg:text-base font-medium">
                      ৳ {product.unitPrice.toFixed(2)}
                    </span>
                  </td>
                  <td className="text-right">
                    <span className="text-sm lg:text-base font-medium">
                      ৳ {product.totalPrice.toFixed(2)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <hr className="pb-6 mt-6" />
          <div className="my-4 mt-6 -mx-2 lg:flex">
            <div className="lg:px-2 lg:w-1/2">
              {/* Coupon Code */}
              <CouponCode />
              {/* Shipping Info */}
              <ShippingInfo />
            </div>

            <div className="lg:px-2 lg:w-1/2">
              {/* PAYMENT METHOD */}
              <PaymentMethod />
              {/* ORDER DETAILS */}
              <OrderDetails />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
