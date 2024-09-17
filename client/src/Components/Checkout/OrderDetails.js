import React, { useEffect , useState } from "react";
import { Link } from "react-router-dom";

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


const OrderDetails = () => {

  const [Subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  //Demo discount and tax rates
  const discountRate = 0.1;  // 10% discount
  const taxRate = 0.2;  // 20% tax


  useEffect(() => {
    //calculating the subtotal
    const newSubTotal = CartProduct.reduce(
      (acc, product) => acc + product.unitPrice * product.quantity,
      0
    );
    setSubtotal(newSubTotal);

    //calculating the discount
    const newDiscount = newSubTotal * discountRate;
    setDiscount(newDiscount);

    //calculating the tax
    const newTax = (newSubTotal - newDiscount) * taxRate;
    setTax(newTax);

    //calculating the total
    const newTotal = newSubTotal - newDiscount + newTax;
    setTotal(newTotal);
  }, [CartProduct]);  //recalculate whenever cartProducts changes  

  return (
    <div>
      <div className="p-3 bg-teal-50 rounded-full">
        <h1 className="ml-2 font-semibold text-teal-600 uppercase">
          Order Details
        </h1>
      </div>
      <div className="p-4">
        <p className="mb-1 italic">
          Shipping and additionnal costs are calculated based on values you have
          entered
        </p>
        <div className="flex justify-between border-b">
          <div className="lg:px-4 lg:py-2 m-1 text-lg lg:text-xl font-medium text-center text-gray-800">
            Subtotal
          </div>
          <div className="lg:px-4 lg:py-2 m-1 lg:text-lg font-medium text-center text-gray-800">
            ৳ {Subtotal.toFixed(2)}
          </div>
        </div>
        <div className="flex justify-between pt-2 border-b">
          <div className="flex lg:px-4 lg:py-2 m-1 text-lg lg:text-xl font-medium text-teal-500">
            <form action="" method="POST">
              <button type="submit" className="mr-2 lg:mt-1">
                <svg
                  aria-hidden="true"
                  data-prefix="far"
                  data-icon="trash-alt"
                  className="w-4 text-red-600 hover:text-red-800"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M268 416h24a12 12 0 0012-12V188a12 12 0 00-12-12h-24a12 12 0 00-12 12v216a12 12 0 0012 12zM432 80h-82.41l-34-56.7A48 48 0 00274.41 0H173.59a48 48 0 00-41.16 23.3L98.41 80H16A16 16 0 000 96v16a16 16 0 0016 16h16v336a48 48 0 0048 48h288a48 48 0 0048-48V128h16a16 16 0 0016-16V96a16 16 0 00-16-16zM171.84 50.91A6 6 0 01177 48h94a6 6 0 015.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-112-48h24a12 12 0 0012-12V188a12 12 0 00-12-12h-24a12 12 0 00-12 12v216a12 12 0 0012 12z"
                  />
                </svg>
              </button>
            </form>
            Coupon "10%off"
          </div>
          <div className="lg:px-4 lg:py-2 m-1 lg:text-lg font-medium text-center text-green-600">
            ৳ {discount.toFixed(2)}
          </div>
        </div>
        <div className="flex justify-between pt-2 border-b">
          <div className="lg:px-4 lg:py-2 m-1 text-lg lg:text-xl font-medium text-center text-gray-800">
            New Subtotal
          </div>
          <div className="lg:px-4 lg:py-2 m-1 lg:text-lg font-medium text-center text-gray-800">
            ৳ {(Subtotal - discount).toFixed(2)}
          </div>
        </div>
        <div className="flex justify-between pt-2 border-b">
          <div className="lg:px-4 lg:py-2 m-1 text-lg lg:text-xl font-medium text-center text-gray-800">
            Tax
          </div>
          <div className="lg:px-4 lg:py-2 m-1 lg:text-lg font-medium text-center text-gray-800">
            ৳ {tax.toFixed(2)}
          </div>
        </div>
        <div className="flex justify-between pt-2 border-b">
          <div className="lg:px-4 lg:py-2 m-1 text-lg lg:text-xl font-medium text-center text-gray-800">
            Total
          </div>
          <div className="lg:px-4 lg:py-2 m-1 lg:text-lg font-medium text-center text-gray-800">
            ৳ {total.toFixed(2)}
          </div>
        </div>
        <a href="#0">
          <Link
            to="/orderHistory"
            className="flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-teal-500 rounded-full shadow item-center hover:bg-teal-700 focus:shadow-outline focus:outline-none"
          >
            <svg
              aria-hidden="true"
              data-prefix="far"
              data-icon="credit-card"
              className="w-8"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path
                fill="currentColor"
                d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z"
              />
            </svg>
            <span className="ml-2 pt-1">Place Order</span>
          </Link>
        </a>
      </div>
    </div>
  );
};

export default OrderDetails;
