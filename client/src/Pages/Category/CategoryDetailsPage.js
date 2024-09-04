import React, { useEffect } from 'react';
import Footer from '../../Components/Home/Footer/Footer';
import Header from '../../Components/Home/NavBar/Header';
import NavBar from '../../Components/Home/NavBar/NavBar';
import CategoryDetails from '../../Components/Category/CategoryDetails/CategoryDetails';

const CategoryDetailsPage = () => {
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
