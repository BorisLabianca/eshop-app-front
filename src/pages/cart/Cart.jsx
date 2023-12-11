import { useDispatch, useSelector } from "react-redux";
import styles from "./Cart.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import Card from "../../components/card/Card";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL,
  CALCULATE_TOTAL_QUANTITY,
  CLEAR_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  SAVE_PREVIOUS_URL,
} from "../../redux/features/cartSlice";
import { useEffect } from "react";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, cartTotalQuantity, cartTotalAmount } = useSelector(
    (store) => store.cart
  );
  const { isLoggedIn } = useSelector((store) => store.auth);
  const url = window.location.href;

  const increaseCart = (item) => {
    dispatch(ADD_TO_CART(item));
  };

  const decreaseCart = (item) => {
    dispatch(DECREASE_CART(item));
  };

  const removeFromCart = (item) => {
    dispatch(REMOVE_FROM_CART(item));
  };

  const clearCart = () => {
    dispatch(CLEAR_CART());
  };

  const checkout = () => {
    if (isLoggedIn) {
      navigate("/checkout-details");
    } else {
      dispatch(SAVE_PREVIOUS_URL(url));
      navigate("/login");
    }
  };

  useEffect(() => {
    dispatch(CALCULATE_TOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
    dispatch(SAVE_PREVIOUS_URL(""));
  }, [cartItems, dispatch]);

  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <>
            <p>Your cart is currently empty.</p>
            <br />
            <div>
              <Link to="/#products">&larr; Continue Shopping</Link>
            </div>
          </>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => {
                  const { id, name, price, imageURL, cartQuantity } = item;
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>
                        <Link to={`/product-details/${id}`}>
                          <p>
                            <b>{name}</b>
                          </p>
                          <img
                            src={imageURL}
                            alt={name}
                            style={{ width: "100px" }}
                          />
                        </Link>
                      </td>
                      <td>${price}</td>
                      <td>
                        <div className={styles.count}>
                          <button
                            className="--btn --btn-danger"
                            onClick={() => decreaseCart(item)}
                          >
                            <b>-</b>
                          </button>
                          <p>
                            <b>{cartQuantity}</b>
                          </p>
                          <button
                            className="--btn --btn-danger"
                            onClick={() => increaseCart(item)}
                          >
                            <b>+</b>
                          </button>
                        </div>
                      </td>
                      <td>${(price * cartQuantity).toFixed(2)}</td>
                      <td className={styles.icons}>
                        <FaTrashAlt
                          size={18}
                          color="red"
                          onClick={() => removeFromCart(item)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className={styles.summary}>
              <button className="--btn --btn-danger" onClick={clearCart}>
                Clear Cart
              </button>
              <div className={styles.checkout}>
                <div>
                  <Link to="/#products">&larr; Continue Shopping</Link>
                </div>
                <br />
                <Card cardClass={styles.card}>
                  <p>
                    <b>{`Cart item${
                      cartTotalQuantity > 1 ? "s" : ""
                    }: ${cartTotalQuantity}`}</b>
                  </p>
                  <div className={styles.text}>
                    <h4>Total:</h4>
                    <h3>${cartTotalAmount.toFixed(2)}</h3>
                  </div>
                  <p>Tax and shipping calculated at checkout.</p>
                  <button
                    className="--btn --btn-primary --btn-block"
                    onClick={checkout}
                  >
                    Checkout
                  </button>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
