import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { categoryProducts } from '../../Redux/productSlice/productSlice';

import Footer from "../../Components/Home/Footer/Footer";
import Header from "../../Components/Home/NavBar/Header";
import NavBar from "../../Components/Home/NavBar/NavBar";
import CategoryDetails from "../../Components/Category/CategoryDetails/CategoryDetails";

const useQuery = () => {
  const a = new URLSearchParams(useLocation().search);
     console.log(a , "kakakkakaka")
   return a
};

const CategoryDetailsPage = () => {
  const dispatch = useDispatch();


  const query = useQuery();
  const categoryName = query.get("category");

  useEffect(() => {
    if (categoryName) {
      console.log("categoryName", categoryName);

      dispatch(categoryProducts(categoryName))
        .unwrap()
        .then((res) => {
          console.error("res", res);
        })
        .catch((error) => {
          console.error("error", error);
        });
    }
  }, [categoryName]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <NavBar />
      <CategoryDetails />
      <Footer />
    </>
  );
};

export default CategoryDetailsPage;