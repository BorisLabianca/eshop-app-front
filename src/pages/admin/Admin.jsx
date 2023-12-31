import { Route, Routes } from "react-router-dom";
import styles from "./Admin.module.scss";
import {
  AddProduct,
  Home,
  NavBar,
  OrderDetails,
  Orders,
  ViewProducts,
} from "../../components";

const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <NavBar />
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="all-products" element={<ViewProducts />} />
          <Route path="add-product/:id" element={<AddProduct />} />
          <Route path="orders" element={<Orders />} />
          <Route path="order-details/:id" element={<OrderDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
