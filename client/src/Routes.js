// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import VenderDashboardPage from './Pages/Admin/Vendor/VenderDashboardPage';
// import LoginPage from './Pages/Authentication/LoginPage';
// import RegistrationPage from './Pages/Authentication/RegistrationPage';
// import CheckoutPage from './Pages/Checkout/CheckoutPage';
// import Home from './Pages/Home/Home';
// import OrderHistory from './Pages/OrderHistory/OrderHistory';
// import ProductDetails from './Pages/ProductDetails/ProductDetails';
// import AllShop from './Pages/Shop/AllShop';
// import ShopDetailsPage from './Pages/Shop/ShopDetailsPage';

// const Navigation = () => {
//   return (
//     <div>
//       <Router>
//         <Routes>
//           <Route exact path="/">
//             <Home />
//           </Route>
//           <Route exact path="/login">
//             <LoginPage />
//           </Route>
//           <Route exact path="/registration">
//             <RegistrationPage />
//           </Route>
//           <Route path="/shopDetails/:vendorId">
//             <ShopDetailsPage />
//           </Route>
//           <Route path="/checkout">
//             <CheckoutPage />
//           </Route>
//           <Route exact path="/productDetails">
//             <ProductDetails />
//           </Route>
//           <Route exact path="/vendor/:panel">
//             <VenderDashboardPage />
//           </Route>
//           <Route path="/allShop">
//               <AllShop></AllShop>
//           </Route>
//           <Route path="/orderHistory">
//             <OrderHistory></OrderHistory>
//           </Route>
//         </Routes>
//       </Router>
//     </div>
//   );
// };

// export default Navigation;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VenderDashboardPage from "./Pages/Admin/Vendor/VenderDashboardPage";
import LoginPage from "./Pages/Authentication/LoginPage";
import RegistrationPage from "./Pages/Authentication/RegistrationPage";
import CheckoutPage from "./Pages/Checkout/CheckoutPage";
import Home from "./Pages/Home/Home";
import OrderHistory from "./Pages/OrderHistory/OrderHistory";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import AllShop from "./Pages/Category/AllShop";
import CategoryDetailsPage from "./Pages/Category/CategoryDetailsPage";
import VendorLayout from "./Components/Admin/Vendor/VendorLayout";
import VendorDashboard from "./Components/Admin/Vendor/VendorDashboard";

const Navigation = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<VendorLayout />}>
          <Route path="" index element={<VendorDashboard />} />
        </Route>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        {/* <Route path="/shopDetails/:vendorId" element={<ShopDetailsPage />} /> */}
        <Route path="/categoryDetails" element={<CategoryDetailsPage />} />
        <Route path="/checkout" element={<CheckoutPage/>} />
        <Route path="/productDetails" element={<ProductDetails />} />
        <Route path="/vendor/:panel" element={<VenderDashboardPage />} />
        <Route path="/allShop" element={<AllShop />} />
        <Route path="/orderHistory" element={<OrderHistory />} />
      </Routes>
    </Router>
  );
};

export default Navigation;
