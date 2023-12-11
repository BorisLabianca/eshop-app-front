import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Pages
import {
  Home,
  Contact,
  Login,
  Register,
  Reset,
  Admin,
  Cart,
} from "./pages/index";

// Components
import { Footer, Header } from "./components/index";

import "./App.css";
import AdminOnlyRoute from "./components/adminOnlyRoute/AdminOnlyRoute";
import FallBackPage from "./pages/FallBackPage";
import ProductDetails from "./components/product/productDetails/ProductDetails";
import CheckoutDetails from "./pages/checkout/CheckoutDetails";
import Checkout from "./pages/checkout/Checkout";
function App() {
  return (
    <>
      <Router>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<Reset />} />
          <Route
            path="/admin/*"
            element={
              <AdminOnlyRoute>
                <Admin />
              </AdminOnlyRoute>
            }
          />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout-details" element={<CheckoutDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<FallBackPage />} />
        </Routes>
        <Footer
          tech={"React"}
          techSite={"https://reactjs.org/"}
          author={"Boris"}
          linkedin={"https://www.linkedin.com/in/boris-labianca-01a52871/"}
        />
      </Router>
    </>
  );
}

export default App;
