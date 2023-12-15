import { useSelector } from "react-redux";
import styles from "./CheckoutSummary.module.scss";
import { Link } from "react-router-dom";
import Card from "../card/Card";

const CheckoutSummary = () => {
  const { cartItems, cartTotalAmount, cartTotalQuantity } = useSelector(
    (store) => store.cart
  );

  return (
    <div>
      <h3>Checkout Summary</h3>
      {cartItems.length === 0 ? (
        <>
          <p>There are no items in your cart.</p>
          <button className="--btn">
            <Link to="/#products">Back To Shop</Link>
          </button>
        </>
      ) : (
        <div>
          <p>
            <b>{`Cart item${
              cartTotalQuantity > 1 ? "s" : ""
            }: ${cartTotalQuantity}`}</b>
          </p>
          <div className={styles.text}>
            <h4>Total</h4>
            <h3>${cartTotalAmount.toFixed(2)}</h3>
          </div>
          {cartItems.map((item) => {
            const { id, name, price, cartQuantity } = item;
            return (
              <Card cardClass={styles.card} key={id}>
                <h4>Product: {name}</h4>
                <p>Quantity: {cartQuantity}</p>
                <p>Unit Price: ${price.toFixed(2)}</p>
                <p>Subtotal: ${(price * cartQuantity).toFixed(2)}</p>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CheckoutSummary;
