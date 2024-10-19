import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCart, removeFromCart } from '../../../Redux/cartSlice/cartSlice';

const products = [
    {
      id: 1,
      name: 'Vitamin C Medicine', 
      href: '#',
      color: 'Salmon',
      price: '90.00',
      quantity: 1,
      imageSrc:
        'https://wpbingosite.com/wordpress/fuho/wp-content/uploads/2020/12/Image-36-1-480x480.jpg',
      imageAlt:
        'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
    },
    {
      id: 2,
      name: 'Stomach Medicine',
      href: '#',
      color: 'Blue',
      price: '32.00',
      quantity: 1,
      imageSrc:
        'https://wpbingosite.com/wordpress/fuho/wp-content/uploads/2020/12/Image-26-1-480x480.jpg',
      imageAlt:
        'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
    },
    // More products...
  ];
  
  

const WishList = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const [cartDetails,setCartDetails]=useState({
    items:[],
    totalPrice:0,
    totalItems:0
  })

  // const fetchCart =()=>{
  //   const {cart} = useSelector((state)=>state.CartDetails)
  //   setCartDetails({
  //     items:cart.items,
  //     totalPrice:cart.totalPrice,
  //     totalItems:cart.totalItems,
  //    });
  // }


  const {cart} = useSelector((state)=>state.CartDetails)
//console.log("cart",cart);

 const dispatch = useDispatch()
  useEffect(()=>{
    setCartDetails({
      items:cart.items,
      totalPrice:cart.totalPrice,
      totalItems:cart.totalItems,
     });
  },[cart])
 // console.log("cart form wishlist",cartDetails);

  const handleRemove = (productId) => {
    //console.log(productId);
    
     dispatch(removeFromCart(productId));
      dispatch(fetchCart())
  }

  const [selectedProduct,setSelectedProduct]=useState()


const updateCart = (productId, price, quantity) => {
  const product = { productId, price, quantity };
  dispatch(addToCart(product));
};

// Handle Quantity Increment/Decrement
const handleQuantityChange = (productId, action, price, currentQuantity) => {
  console.log("productId",productId);
  
  console.log("currentQuantity",currentQuantity);
  
  const newQuantity = action === 'increase' ? currentQuantity + 1 : currentQuantity - 1;
  console.log("newQuantity",newQuantity);
  
  if (newQuantity < 1) return; // Don't allow quantity to be less than 1

  setCartDetails((prevDetails) => {
    const updatedItems = prevDetails?.items?.map((item) => {
      if (item?.productId?._id === productId) {
        return {
          ...item,
          productId: {
            ...item?.productId,
            quantity: newQuantity,
          },
        };
      }
      return item;
    });

    // Update total price based on the new quantity
    const updatedTotalPrice = updatedItems.reduce(
      (sum, item) => sum + item?.productId?.price * item?.productId?.quantity,
      0
    );

    return {
      ...prevDetails,
      items: updatedItems,
      totalPrice: updatedTotalPrice,
    };
  });

  // Update cart with new quantity
  updateCart(productId,price, newQuantity);
};
    return (
        <div>
            <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-hidden z-50"
          onClose={setOpen}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div  
                
                 className="w-screen max-w-md font-sans"
                 onClick={(e) => e.stopPropagation()}
                 >
                  <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                    <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-teal-700 tracking-wide">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 h-7 flex items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            //onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <FontAwesomeIcon
                              className="text-2xl text-gray-600"
                              icon={faTimes}
                            />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                            onClick={()=>setOpen(true)}
                          >
                          

                            {cartDetails?.items?.map((product,index) => (
                              <li key={index} className="py-6 flex">
                                <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                  <img
                                    src={'https://wpbingosite.com/wordpress/fuho/wp-content/uploads/2020/12/Image-26-1-480x480.jpg' || product.productId.images[0].url  }
                                    //alt={product.imageAlt}
                                    className="w-full h-full object-center object-cover"
                                  />
                                </div>

                                <div className="ml-4 flex-1 flex flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-800">
                                      <h3>
                                        <a 
                                       // href={product.href}
                                        >
                                          {product?.productId?.name}
                                        </a>
                                      </h3>
                                      <p className="ml-4">৳ {product?.productId?.price}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                      green
                                    </p>
                                  </div>
                                  <div className="flex-1 flex items-end justify-between text-sm">
                                    <div className="border flex justify-center items-center border-gray-300 rounded">
                                      <i
                                      onClick={() => handleQuantityChange(product?.productId?._id, 'decrease',product?.productId?.price, product?.quantity)}
                                       className=" m-1 py-1 px-4 cursor-pointer font-normal text-teal-600">--</i>
                                      <div className="  w-15 text-center items-center  h-5 text-gray-900">
                                        {product?.quantity}
                                      </div>

                                      <i
                                      onClick={() => handleQuantityChange(product?.productId?._id, 'increase',product?.productId?.price, product?.quantity)}
                                       className="fas fa-plus m-1 py-1 px-4 cursor-pointer font-normal text-teal-600"></i>
                                    </div>

                                    <div className="flex">
                                      <button
                                     onClick={()=>handleRemove(product?.productId?._id)}
                                        type="button"
                                        className="font-medium tracking-wide text-teal-600 hover:text-teal-800"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-800">
                        <p>Subtotal</p>
                        <p>{cartDetails?.totalPrice}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                      
                      


                        <Link
                          onClick={() =>{ setOpen(false); navigate('/checkout');}}
                          to="/checkout"
                          className="flex  justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-teal-500 hover:bg-teal-700"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                            />
                          </svg>
                          Checkout
                        </Link>
                      </div>
                      <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                        <p>
                          or{' '}
                          <button
                            type="button"
                            className="text-teal-500 font-medium hover:text-teal-700"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
        </div>
    );
};

export default WishList;