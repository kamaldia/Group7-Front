import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
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
function App() {
  function ProtectedRoute({ children }) {
    const isAuthenticated = localStorage.getItem("authToken") !== "";
    if (isAuthenticated) {
      return children;
    } else {
      return <Navigate to="/login" />;
    }
  }

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
