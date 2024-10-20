import React, { useEffect, useState } from 'react';
import Footer from '../../Components/Home/Footer/Footer';
import Header from '../../Components/Home/NavBar/Header';
import NavBar from '../../Components/Home/NavBar/NavBar';
import Menu from '../../Components/ProductDetails/Menu';
import ProductInfo from '../../Components/ProductDetails/ProductInfo';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null); // State to hold the product data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage any errors

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Function to fetch product by ID
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`https://medimart-nayg.onrender.com/product/getProductById/${id}`);
      setProduct(response.data); // Store the fetched product in state
      setLoading(false); // Turn off loading once data is fetched
    } catch (error) {
      setError('Error fetching product');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>; // Show loading message
  }

  if (error) {
    return <p>{error}</p>; // Show error message if fetching fails
  }

  return (
    <>
      <Header />
      <NavBar />
      <section className="overflow-hidden">
        <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          {product && (
            <>
              <ProductInfo product={product} /> {/* Pass the fetched product to ProductInfo */}
              <Menu product={product} />
            </>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProductDetails;



























// import React, { useEffect } from 'react';
// import Footer from '../../Components/Home/Footer/Footer';
// import Header from '../../Components/Home/NavBar/Header';
// import NavBar from '../../Components/Home/NavBar/NavBar';
// import Menu from '../../Components/ProductDetails/Menu';
// import ProductInfo from '../../Components/ProductDetails/ProductInfo';
// import productsData from '../../Data/products';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const ProductDetails = () => {
//   const product = productsData[1];
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);
//   const {id} = useParams();
//   console.log("id",id);

//   const fetchProduct =async()=>{
//     const product = await axios.get(`http://localhost:4000/product/getProductById/${id}`)
//     console.log("product",product);
    

//   }

//   useEffect(()=>{
//     fetchProduct();
//   },[])
  
//   return (
//     <>
//       <Header />
//       <NavBar />
//       <section className="overflow-hidden">
//         <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
//           <ProductInfo product={product} />
//           <Menu product={product} />
//         </div>
//       </section>
//       <Footer />
//     </>
//   );
// };

// export default ProductDetails;



