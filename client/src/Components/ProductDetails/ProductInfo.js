import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import QuantityButton from '../Common/QuantityButton';
import ShowRating from '../Common/ShowRating';
import { addToCart } from '../../Redux/cartSlice/cartSlice';
import { useDispatch } from 'react-redux';

const ProductInfo = ({
  product
}) => {
  const dispatch = useDispatch();
  const { images, brand, description, price, name } = product;
  const [quantity, setQuantity] = useState(1);  // Default quantity is 1

  const handleAddToCart = () => {
    console.log("handleAddToCart");
    dispatch( addToCart({
      productId: product._id,
      price: product.price,
      quantity:quantity
    }));
   
  };
  return (
    <div className="mx-auto flex flex-wrap justify-between">
      <img
        alt="ecommerce"
        className="lg:w-1/3 w-full lg:h-auto h-64 object-cover object-center rounded"
       src='https://i.ibb.co/8cb2G7H/shop-4-8-1000x1000-min.jpg'
      />
      <div className="lg:w-2/3 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <h1 className="text-teal-500 text-3xl font-display title-font font-medium mb-2">
          {name}
        </h1>
        <h2 className="text-sm title-font text-gray-800 tracking-widest mb-2">
          Brand: {brand}
        </h2>
        <div className="mb-2">
          <ShowRating value={4} />
        </div>
        <p className="leading-relaxed tracking-wide text-gray-800 font-sans h-20 overflow-hidden">
          {description}
        </p>
        <div className="flex mt-4 items-center pb-4 border-b-2 border-gray-100 mb-4">
          <span className="title-font font-medium text-2xl text-gray-900">
          ₹{price}
          </span>
        </div>
        <div className="flex flex-wrap gap-3 align-center">
          <QuantityButton setQuantity={setQuantity} quantity={quantity} />

          {/* //<Link to="checkout"> */}
            <button  onClick={handleAddToCart} class="flex flex-wrap items-center py-2 px-4 text-lg rounded shadow-lg bg-teal-500 focus:outline-none active:bg-teal-500 text-white transition duration-150 ease-in-out hover:bg-teal-700">
              <i class="fas fa-cart-plus"></i> &nbsp; Add To Cart
            </button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
