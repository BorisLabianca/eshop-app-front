import { FaUserCircle } from "react-icons/fa";
import styles from "./NavBar.module.scss";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const NavBar = () => {
  const { userName } = useSelector((store) => store.auth);
  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <FaUserCircle size={40} color="#fff" />
        <h4>{userName}</h4>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/home" className={activeLink}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/all-products" className={activeLink}>
              All Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/add-product" className={activeLink}>
              Add Product
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders" className={activeLink}>
              Orders
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
