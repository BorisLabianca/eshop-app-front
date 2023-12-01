import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import styles from "./Header.module.scss";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  SET_ACTIVE_USER,
  REMOVE_ACTIVE_USER,
} from "../../redux/features/authSlice";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLinks/HiddenLinks";
import { AdminOnlyLink } from "../adminOnlyRoute/AdminOnlyRoute";

const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        e<span>Shop</span>BLab
      </h2>
    </Link>
  </div>
);

const cart = (
  <span className={styles.cart}>
    <Link to="/cart">
      Cart <FaShoppingCart size={20} />
      <p>0</p>
    </Link>
  </span>
);

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuVisible, setMenuVisible] = useState(false);
  const [userName, setUserName] = useState("");

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const hideMenu = () => {
    setMenuVisible(false);
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("You've been logged out/");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // Monitor currently signed in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName === null) {
          setUserName(
            user.email.split("@")[0].charAt(0).toUpperCase() +
              user.email.split("@")[0].slice(1)
          );
          dispatch(
            SET_ACTIVE_USER({
              email: user.email,
              userName:
                user.email.split("@")[0].charAt(0).toUpperCase() +
                user.email.split("@")[0].slice(1),
              userId: user.uid,
            })
          );
        } else {
          setUserName(user.displayName);
          dispatch(
            SET_ACTIVE_USER({
              email: user.email,
              userName: user.displayName,
              userId: user.uid,
            })
          );
        }
      } else {
        setUserName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, userName]);

  return (
    <header>
      <div className={styles.header}>
        {logo}
        <nav
          className={
            menuVisible ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
          }
        >
          <div
            className={
              menuVisible
                ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                : `${styles["nav-wrapper"]}`
            }
            onClick={hideMenu}
          ></div>
          <ul onClick={hideMenu}>
            <li className={styles["logo-mobile"]}>
              {logo}
              <FaTimes size={22} color="#fff" onClick={hideMenu} />
            </li>
            <AdminOnlyLink>
              <li>
                <Link to="/admin/home">
                  <button className="--btn --btn-primary">Admin</button>
                </Link>
              </li>
            </AdminOnlyLink>
            <li>
              <NavLink to="/" className={activeLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={activeLink}>
                Contact Us
              </NavLink>
            </li>
          </ul>
          <div className={styles["header-right"]} onClick={hideMenu}>
            <span className={styles.links}>
              <ShowOnLogout>
                <NavLink to="/login" className={activeLink}>
                  Login
                </NavLink>
              </ShowOnLogout>
              <ShowOnLogin>
                <a
                  href="/"
                  style={{
                    color: "#ff7722",
                  }}
                >
                  <FaUserCircle size={16} />
                  <span>Hi, {userName}</span>
                </a>
              </ShowOnLogin>
              <ShowOnLogin>
                <NavLink to="/order-history" className={activeLink}>
                  My Orders
                </NavLink>{" "}
              </ShowOnLogin>
              <ShowOnLogin>
                <NavLink to="/" onClick={logoutUser}>
                  Log Out
                </NavLink>
              </ShowOnLogin>
            </span>
            {cart}
          </div>
        </nav>
        <div className={styles["menu-icon"]}>
          {cart}
          <HiOutlineMenuAlt3 size={20} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
