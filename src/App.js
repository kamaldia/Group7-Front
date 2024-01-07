import "./App.css";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./Context/AuthContext.js";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
//Pages & Components
import Home from "./pages/Home/Home";
import AdminDashboard from "./pages/adminDashboard/adminDashboard";
import AdminCategory from "./pages/adminCategory/adminCategoryView";
import AdminAdmins from "./pages/adminAdmins/adminAdmins";
import AdminLogin from "./pages/loginPage/adminLogin";
import Notfound from "./pages/NotFoundPage/notfound";
import AdminProducts from "./pages/adminProducts/adminProducts";
import AdminAddProductPage from "./pages/adminProducts/adminAddProductPage";
import AdminAdvertisement from "./pages/adminAdvertisement/adminAdvertisement";
import AdminBlogs from "./pages/adminBlogs/adminBlogs";
import AdminCarousels from "./pages/adminCarousels/adminCarousels";
import AdminContactUs from "./pages/AdminContactUsPage/adminContactus";
import Contacttuss from "./pages/contacttuss/contacttuss";
import AboutUs from "./pages/aboutUs/aboutUs";
import SingleProduct from "./pages/SingleProduct/SingleProduct";
import AllProducts from "./pages/allProducts/AllProducts";
import ProductsByCategory from "./pages/ProductsByCategory/ProductsByCategory";
import SideNavbar from "./components/SideNavbar/sideNavbar";

function App() {
  const { SetToken, setUser, user } = useContext(AuthContext);
  console.log("this is user in appjs: ", user);
  const [local_token, setLocalToken] = useState(localStorage.getItem("token"));
  const [render, setRender] = useState(0);

  function ProtectedRoute({ children }) {
    const isAuthenticated = localStorage.getItem("token");
    if (isAuthenticated) {
      return children;
    } else {
      setUser(null);
      setRender((old) => {
        //to rerender the button if no token or null
        old++;
      });
    }
  }

  const Layout = ({ children }) => {
    return (
      <>
        <div style={{ display: "flex", gap: "50px" }}>
          <SideNavbar />
          <Outlet />
        </div>
      </>
    );
  };

  const google = window.google;
  const client_id =
    "644557351884-pd9bsn8mejbca84pmu140sn1alprglpn.apps.googleusercontent.com";

  const handleCallbackResponse = (response) => {
    try {
      // console.log("Encoded JWT ID token: " + response.credential);
      SetToken(response.credential);
    } catch (error) {
      console.error("error decoding jwt: ", error);
    }
  };

  useEffect(() => {
    if (!local_token) {
      console.error("no token available");
    } else {
      axios.defaults.headers.common["Authorization"] = `Bearer ${local_token}`;
    }
  }, [local_token]);

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: client_id,
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("sign-in-div"), {
      theme: "outline",
      size: "large",
    });
  }, [render]);

  return (
    <div className="App">
      {user ? (
        <BrowserRouter>
          <div className="pages">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<AdminLogin />} />
              <Route
                path="admin"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <AdminDashboard />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route path="admin/categories" element={<AdminCategory />} />
              <Route path="admin/admins" element={<AdminAdmins />} />
              <Route path="admin/products" element={<AdminProducts />} />
              <Route
                path="admin/products/add"
                element={<AdminAddProductPage />}
              />
              <Route
                path="admin/advertisements"
                element={<AdminAdvertisement />}
              />
              <Route path="admin/blogs" element={<AdminBlogs />} />
              <Route path="admin/contactus" element={<AdminContactUs />} />
              <Route path="admin/carousels" element={<AdminCarousels />} />

              <Route path="product/:productId" element={<SingleProduct />} />
              <Route path="products" element={<AllProducts />} />
              <Route
                path="products/:categoryName"
                element={<ProductsByCategory />}
              />
              <Route path="aboutus" element={<AboutUs />} />
              <Route path="contacttuss" element={<Contacttuss />} />
              <Route path="/*" element={<Notfound />} />
            </Routes>
          </div>
        </BrowserRouter>
      ) : (
        <section className="login-block">
          <p className="sign-in-phrase">Sign in to continue</p>
          <div id="sign-in-div"></div>
        </section>
      )}
    </div>
  );
}

export default App;
