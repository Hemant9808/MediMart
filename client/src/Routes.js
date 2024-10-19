

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
        <Route path="/productDetails/:id" element={<ProductDetails />} />
        <Route path="/vendor/:panel" element={<VenderDashboardPage />} />
        <Route path="/allShop" element={<AllShop />} />
        <Route path="/orderHistory" element={<OrderHistory />} />
      </Routes>
    </Router>
  );
};

export default Navigation;
