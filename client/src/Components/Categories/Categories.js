import React, { useEffect, useState } from 'react';
import CategoryData from '../../Data/category';
import { useDispatch } from "react-redux";
import { categoryProducts } from '../../Redux/productSlice/productSlice';
import { useLocation } from 'react-router-dom';

const useQuery = () => {
  const a = new URLSearchParams(useLocation().search);
     console.log(a , "kakakkakaka")
   return a
};                  


const Categories = () => { 

  const dispatch = useDispatch();
  const [categories, setCategories] = useState(CategoryData);
  const [selectCategory , setSelectCategory] = useState();

  const query = useQuery();
  const categoryName = query.get("category");

   useEffect(()=>{
      setSelectCategory(categoryName)
   }, []);

  
 
 
 
 const switchCategory = (value) =>{
      console.log(value , "dckdnjkncjdsnj");
      
      // selectCategory === value ? setSelectCategory("") :  setSelectCategory(value);


      // console.log(selectCategory , "sadddddddddddddddddddddddddddddd");

      if( selectCategory === value){
        setSelectCategory("");
        dispatch(categoryProducts(""))
      .then((res) => {
        console.error("res", res);
      })
      .catch((error) => {
        console.error("error", error);
      });
      }
      else{
          setSelectCategory(value);
          dispatch(categoryProducts(value))
      .then((res) => {
        console.error("res", res);
      })
      .catch((error) => {
        console.error("error", error);
      });
      }
      
     
  }





  // console.log(categories[0].category)
  return (
    <div className="mt-12">
      <h1 className="px-3 text-lg font-display font-semibold mb-5 text-teal-700">
        Product Category
      </h1>
      <div className=" ">
        {categories.map((singleCategory) => (
          <div className="m-2" onClick={ () =>  switchCategory(singleCategory.categoryName)}>
            <ul>
              <li className={`bg-teal-50 hover:bg-teal-100 shadow-4xl my-4 p-2 cursor-pointer `} 
               style={{ backgroundColor: selectCategory === singleCategory?.categoryName ? 'lightgreen' : '' }}>
                <div className="flex justify-between items-center">
                  <p className="text-gray-800 whitespace-no-wrap tracking-wide">
                    {singleCategory?.categoryName}
                    
                  </p>
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </div>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
