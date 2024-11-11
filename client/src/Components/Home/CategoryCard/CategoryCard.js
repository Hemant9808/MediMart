import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import categoryCard from "../../../Data/category";
import axios from "axios";

const CategoryItems = [
  {
    id: 1,
    name: "Apollo Product",
    img: "https://images.apollo247.in/pub/media/catalog/category/apollo_products_1.jpg?tr=w-367.5,q-100,f-webp,c-at_max",
  },
  {
    id: 2,
    name: "Baby Care",
    img: "https://images.apollo247.in/pub/media/catalog/category/baby_care_1.jpg?tr=w-367.5,q-100,f-webp,c-at_max",
  },
  {
    id: 3,
    name: "Monsoon Essentials",
    img: "https://images.apollo247.in/pub/media/catalog/category/monsoon_essential_icon_new.jpg?tr=w-367.5,q-100,f-webp,c-at_max",
  },
  {
    id: 4,
    name: "Personal Care",
    img: "https://images.apollo247.in/pub/media/catalog/category/personalcare_2.jpg?tr=w-367.5,q-100,f-webp,c-at_max",
  },
  {
    id: 5,
    name: "Nutrition & Suppliments",
    img: "https://images.apollo247.in/pub/media/catalog/category/nutritional_supp.jpg?tr=w-367.5,q-100,f-webp,c-at_max",
  },
  {
    id: 6,
    name: "Skin Care",
    img: "https://images.apollo247.in/pub/media/catalog/category/skin_care.jpg?tr=w-367.5,q-100,f-webp,c-at_max",
  },
  {
    id: 7,
    name: "Women Care",
    img: "https://images.apollo247.in/pub/media/catalog/category/women_care_new_i.jpg?tr=w-367.5,q-100,f-webp,c-at_max",
  },
  {
    id: 8,
    name: "Protein Supplements",
    img: "https://images.apollo247.in/pub/media/catalog/category/protein_supplements_1.jpg?tr=w-367.5,q-100,f-webp,c-at_max",
  },
  {
    id: 9,
    name: "Multivitamins",
    img: "https://images.apollo247.in/pub/media/catalog/category/multi_vitamins.jpg?tr=w-367.5,q-100,f-webp,c-at_max",
  },
  {
    id: 10,
    name: "Glucometer & Test Strips",
    img: "https://images.apollo247.in/pub/media/catalog/category/glucometer_strips_1.jpg?tr=w-367.5,q-100,f-webp,c-at_max",
  },
  {
    id: 11,
    name: "Health Devices",
    img: "https://images.apollo247.in/pub/media/catalog/category/healthdevices_2.jpg?tr=w-367.5,q-100,f-webp,c-at_max",
  },
  {
    id: 12,
    name: "Ayurveda",
    img: "https://images.apollo247.in/pub/media/catalog/category/ayurveda_icon.jpg?tr=w-367.5,q-100,f-webp,c-at_max",
  },
];

const CategoryCard = () => {
  const [categories,setCategories]=useState([]);
const getCategory=async()=>{
  const response= await axios("https://medimart-nayg.onrender.co/category/getAllCategories")
  console.log("getcategory",response);
  setCategories(response.data)
  
}
useEffect(()=>{
  getCategory();
},[])
  return (
    <>
      {/* <Link to={`/categoryDetails/${categoryCard._id}`}> */}
      
        <div className="px-4 md:px-24 lg:px-8 mx-auto py-16 sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
          <h1 className="text-3xl sm:text-4xl font-semibold font-display text-gray-800 pb-10 text-center sm:text-left">
            Shop by Category
          </h1>
          <div className="gap-4 md:gap-12 flex flex-row flex-wrap justify-between">
            {categories.map((item) => (
             <Link to={`/categoryDetails?category=${item.name}`}> <div className="flex flex-col items-center cursor-pointer">
                {/* Category Image */}
                <div className="bg-[#E9FAEE] hover:shadow-lg transition duration-300 ease-in-out">
                  <img src="https://images.apollo247.in/pub/media/catalog/category/apollo_products_1.jpg?tr=w-367.5,q-100,f-webp,c-at_max" alt="icon-1" className="w-40 h-40 " />
                </div>
                {/* Category Name */}
                <div className="my-5">
                  <h2 className="w-full items-center">{item.name}</h2>
                </div>
              </div>
              </Link>
            ))}
          </div>
        </div>
      
    </>
  );
};

export default CategoryCard;
