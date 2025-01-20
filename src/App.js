import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./views/pages/Products";
import Login from "./views/pages/Authentication/login";
import PrivateRoutes from "./views/pages/Authentication/privateRoutes";
import AddToCart from "./views/pages/Products/addToCart";
import { CartProvider } from "./redux/context/cartContext";
import ProductDetail from "./views/pages/Products/productDetail";
import Category from "./views/pages/Products/category";
import PageNotFound from "./views/pages/Authentication/pageNotFound";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const token = localStorage.getItem("UserData");

  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route
            element={token ? <Navigate to="/home" /> : <Login />}
            path="/login"
          />
          <Route element={<PrivateRoutes />}>
            <Route element={<Home />} path="/home" />
            <Route element={<Home />} path="/products" />
            <Route element={<Category />} path="/category-wise-products" />
            <Route element={<ProductDetail />} path="/product-detail" />
            <Route element={<Login />} path="/login" />
            <Route element={<AddToCart />} path="/cart" />

            {/* Page 404 */}
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
