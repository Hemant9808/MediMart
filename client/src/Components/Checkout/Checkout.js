import React, { useEffect, useState } from "react";
import PaymentMethod from "./PaymentMethod";
import OrderDetails from "./OrderDetails";
import CouponCode from "./CouponCode";
import ShippingInfo from "./ShippingInfo";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, removeFromCart } from "../../Redux/cartSlice/cartSlice";
import axios from "axios";

const Checkout = () => {
  const [cartProduct, setCartProduct] = useState();
  const { cart } = useSelector((state) => state.CartDetails);
  const [paymentMethod, setPaymentMethod] = useState();
  const [orderDetails, setOrderDetails] = useState({
    items: cart.items,
    shippingAddress: {
      address: "",
      city: "",
      postalCode: "",
      country: "",
    },
    paymentMethod: "",

    razorpay_order_id: "",
    shippingPrice: 0,
    totalPrice: cart.totalPrice,
  });

  const createOrder = async () => {
    const response = await axios.post(
      "https://medimart-nayg.onrender.com/order/createorder",
      orderDetails,
      {
        headers: {
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTE1NzFmZWM4M2VlM2E4OGJjNzI4YSIsImlhdCI6MTcyNjQxMzc1OX0.QH1quEr3Hakn0Ku4h7GSLbAlyrr1tj3QkEeeH9OooC0",
          "Content-Type": "application/json",
        },
      }
    );
    
  };

  // Function to update the shipping address in the state
  const updateShippingAddress = (updatedAddress) => {
    setOrderDetails((prevState) => ({
      ...prevState,
      shippingAddress: updatedAddress,
    }));
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // Update the cartProduct state when cart data is available
  useEffect(() => {
    if (cart && cart.items) {
      setCartProduct(cart);
    }
    if (cart.items && cart.items.length > 0) {
      setOrderDetails((prevDetails) => ({
        ...prevDetails,
        items: cart.items, // Update items when cart.items has data
      }));
    }
  }, [cart]);

  console.log("orderDetails", orderDetails);

  const handleRemove = (productId) => {
    //console.log(productId);

    dispatch(removeFromCart(productId));
    dispatch(fetchCart());
  };

  const checkoutHandler = async (amount) => {
    const {
      data: { key },
    } = await axios.get("https://medimart-nayg.onrender.com/payment/getkey");

    
  let number = 300.78
    const {
      data: { order },
    } = await axios.post("https://medimart-nayg.onrender.com/payment/checkout", 
     
      { amount: Math.round(amount) },)

     
    
    orderDetails.razorpay_order_id = order.id;
    const response =createOrder();
    

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "Hemant Kumar",
      description: "RazorPay",
      image:
        "https://avatars.githubusercontent.com/u/143936287?s=400&u=b0405682c50a0ca7f98e02b46db96e91520df3b5&v=4",
      order_id: order.id,
      callback_url: "https://medimart-nayg.onrender.com/payment/paymentverification",
      prefill: {
        name: "Hemant Kumar",
        email: "hemant.kumar@example.com",
        contact: "9304389008",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      prefill: {
        name: "John Doe", // User's name
        email: "john.doe@example.com", // User's email
        contact: "9876543210", // User's phone number
      },
      theme: {
        color: "#121212",
      },
      method: {
        upi: true, // This ensures UPI shows up
        card: true,
        netbanking: true,
        wallet: true,
      },
    };
    const razor = new window.Razorpay(options);
    console.log("response kfjsnf",response.object);
    
    razor.open()
    
  };

  return (
    <div>
      {cartProduct ? (
        <div className="flex justify-center my-6">
          <div className="flex flex-col w-full p-8 text-gray-800 bg-white pin-r pin-y md:w-4/5 lg:w-4/5">
            <div className="flex-1">
              <table className="w-full text-sm lg:text-base" cellSpacing="0">
                <thead>
                  <tr className="h-12 font-sans text-gray-800 text-lg border border-teal-300 border-t-0 border-l-0 border-r-0">
                    {/* <th className="hidden text-left md:table-cell font-medium text-teal-600">
                    Product Image
                  </th> */}
                    <th className="text-left font-medium text-teal-600">
                      Product Details
                    </th>
                    <th className="text-center pl-5 lg:pl-8">
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
                  {cartProduct?.items?.map((product) =>
                    // Check if productId exists
                    product.productId ? (
                      <tr key={product._id}>
                        {/* <td className="hidden pb-4 md:table-cell">
                        <a href="#0">
                          <img
                            src={product.productId.images[0]?.url || "https://via.placeholder.com/150"}
                            className="w-20 rounded"
                            alt={product.productId.name}
                          />
                        </a>
                      </td> */}
                        <td>
                          <a href="#0">
                            <p>{product.productId.name}</p>
                            <small>{product.productId.brand}</small>
                          </a>
                        </td>
                        <td className="justify-center md:justify-end md:flex mt-3">
                          <div className="flex-1 flex items-end justify-center text-sm">
                            <div className="border border-gray-400 rounded flex items-center">
                              <i
                                className="fa-regular  m-1 py-1 px-2 cursor-pointer font-semibold text-teal-600"
                                // onClick={() => decreaseQuantity(product._id)}
                              >
                                {product.quantity}
                              </i>
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
                            onClick={() => handleRemove(product.productId._id)}
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
                            ₹ {product?.productId?.price?.toFixed(2)}
                          </span>
                        </td>
                        <td className="text-right">
                          <span className="text-sm lg:text-base font-medium">
                            ₹{" "}
                            {(
                              product?.productId?.price * product?.quantity
                            ).toFixed(2)}
                          </span>
                        </td>
                      </tr>
                    ) : (
                      // Handle products with null productId
                      <tr key={product._id}>
                        <td
                          colSpan="6"
                          className="text-center text-red-600"
                        ></td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>

              <hr className="pb-6 mt-6" />
              <div className="my-4 mt-6 -mx-2 lg:flex">
                <div className="lg:px-2 lg:w-1/2">
                  <CouponCode />
                  <ShippingInfo
                    shippingAddress={orderDetails.shippingAddress}
                    updateShippingAddress={updateShippingAddress}
                  />
                </div>

                <div className="lg:px-2 lg:w-1/2">
                  <PaymentMethod orderDetails={orderDetails} />
                  <OrderDetails
                    orderDetails={orderDetails}
                    checkoutHandler={checkoutHandler}
                    createOrder={createOrder}
                    cartProduct={cartProduct}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>items not found</div>
      )}
    </div>
  );
};

export default Checkout;
