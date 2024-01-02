import React from "react";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
// Pages & Components
import Home from "./pages/Home/Home";
import AdminDashboard from "./Dashboard/adminDashboard/adminDashboard";
import AdminCategory from "./Dashboard/adminCategory/adminCategoryView";
import AdminAdmins from "./Dashboard/adminAdmins/adminAdmins";
import AdminLogin from "./Dashboard/loginPage/adminLogin";
import Notfound from "./pages/NotFoundPage/notfound";
import AdminProducts from "./Dashboard/adminProducts/adminProducts";
import AdminAddProductPage from "./Dashboard/adminProducts/adminAddProductPage";
import AdminAdvertisement from "./Dashboard/adminAdvertisement/adminAdvertisement";
import AdminBlogs from "./Dashboard/adminBlogs/adminBlogs";
import AdminCarousels from "./Dashboard/adminCarousels/adminCarousels";
import AdminContactUs from "./Dashboard/AdminContactUsPage/adminContactus";
import Contacttuss from "./pages/contacttuss/contacttuss";
import AboutUs from "./pages/aboutUs/aboutUs";
import SingleProduct from "./pages/SingleProduct/SingleProduct";
import AllProducts from "./pages/allProducts/AllProducts";
import ProductsByCategory from "./pages/ProductsByCategory/ProductsByCategory";
import SideNavbar from "./components/SideNavbar/sideNavbar";

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("authToken") != null;
  return isAuthenticated ? children : <Navigate to="/login" />;
}

const Layout = ({ children }) => {
  return (
    <>
      <div style={{ display: 'flex', gap: '50px' }}>
        <SideNavbar />
        <Outlet />
      </div>
    </>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<AdminLogin />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Route path="admin" element={<AdminDashboard />} />
                    <Route path="admin/categories" element={<AdminCategory />} />
                    <Route path="admin/admins" element={<AdminAdmins />} />
                    <Route path="admin/products" element={<AdminProducts />} />
                    <Route path="admin/products/add" element={<AdminAddProductPage />} />
                    <Route path="admin/advertisements" element={<AdminAdvertisement />} />
                    <Route path="admin/blogs" element={<AdminBlogs />} />
                    <Route path="admin/contactus" element={<AdminContactUs />} />
                    <Route path="admin/carousels" element={<AdminCarousels />} />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route path="product/:productId" element={<SingleProduct />} />
            <Route path="products" element={<AllProducts />} />
            <Route path="products/:categoryName" element={<ProductsByCategory />} />
            <Route path="aboutus" element={<AboutUs />} />
            <Route path="contacttuss" element={<Contacttuss />} />
            <Route path="/*" element={<Notfound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
