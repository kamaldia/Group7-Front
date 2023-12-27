import "./App.css";
import { useEffect, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./Context/AuthContext.js";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
function App() {
  const { token, SetToken, setUser, user } = useContext(AuthContext);

  const [render, setRender] = useState(0);

  const google = window.google;
  const client_id =
    "644557351884-pd9bsn8mejbca84pmu140sn1alprglpn.apps.googleusercontent.com";

  const handleCallbackResponse = (response) => {
    try {
      console.log("Encoded JWT ID token: " + response.credential);
      var user_object = jwtDecode(response.credential);
      console.log("this is user object: ", user_object);
      setUser(user_object);
      SetToken("true"); // not a real token, we can add a real token later to control admin and user posting permissions
      localStorage.setItem('token', token);
    } catch (error) {
      console.error("error decoding jwt: ", error);
    }
  };

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

  function ProtectedRoute({ children }) {
    const isAuthenticated = localStorage.getItem("Token") !== false;
    if (isAuthenticated) {
      return children;
    } else {
      setUser(null);
      setRender((old) => {
        old++;
      });
    }
  }

  return (
    <div className="App">
      {user ? (
        <BrowserRouter>
          <div className="pages">
            <Routes>
              <Route path="/" element={<Home />} />

              <Route
                path="/admin"
                element={<ProtectedRoute>{<AdminDashboard />}</ProtectedRoute>}
              />
              <Route path="/login" element={<AdminLogin />} />
              <Route path="/admin/categories" element={<AdminCategory />} />
              <Route path="/admin/admins" element={<AdminAdmins />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route
                path="/admin/products/add"
                element={<AdminAddProductPage />}
              />
              <Route
                path="/admin/advertisements"
                element={<AdminAdvertisement />}
              />
              <Route path="/admin/blogs" element={<AdminBlogs />} />
              <Route path="admin/contactus" element={<AdminContactUs />} />
              <Route path="/admin/carousels" element={<AdminCarousels />} />

              <Route path="/home" element={<Home />} />
              <Route path="/product/:productId" element={<SingleProduct />} />
              <Route path="/products" element={<AllProducts />} />
              <Route
                path="/products/:categoryName"
                element={<ProductsByCategory />}
              />
              <Route path="/aboutus" element={<AboutUs />} />

              <Route path="/*" element={<Notfound />} />

              <Route path="/contacttuss" element={<Contacttuss />} />
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
