import { Link, useParams } from "react-router-dom";
import styles from "./ProductDetails.module.scss";
import { useEffect, useState } from "react";
import spinner from "../../../assets/spinner.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
  DECREASE_CART,
  REMOVE_FROM_CART,
} from "../../../redux/features/cartSlice";
import useFetchDocument from "../../../customHooks/useFetchDocument";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import Card from "../../card/Card";
import StarsRating from "react-star-rate";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const { document } = useFetchDocument("products", id);
  const { data } = useFetchCollection("reviews");
  const filteredReviews = data.filter((review) => review.productID === id);

  const { cartItems } = useSelector((state) => state.cart);
  const cart = cartItems.find((item) => item.id === id);

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  const removeFromCart = (product) => {
    dispatch(REMOVE_FROM_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  useEffect(() => {
    setProduct(document);
  }, [document]);

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2>Product Details</h2>
        <div>
          <Link to="/#products">&larr; Back To Products</Link>
        </div>
        {product === null ? (
          <img
            src={spinner}
            alt="Loading..."
            style={{ width: "50px" }}
            className="--center-all"
          />
        ) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={product.imageURL} alt={product.name} />
              </div>
              <div className={styles.content}>
                <h3>{product.name}</h3>
                <p className={styles.price}>${product.price}</p>
                <p>{product.description}</p>
                <p>
                  <b>SKU:</b> {product.id}
                </p>
                <p>
                  <b>Brand:</b> {product.brand}
                </p>
                {cart && (
                  <div className={styles.count}>
                    <button
                      className="--btn"
                      onClick={() => decreaseCart(product)}
                    >
                      -
                    </button>
                    <p>
                      <b>{cart ? cart.cartQuantity : 0}</b>
                    </p>
                    <button
                      className="--btn"
                      onClick={() => addToCart(product)}
                    >
                      +
                    </button>
                  </div>
                )}
                {cart ? (
                  <button
                    className="--btn --btn-danger"
                    onClick={() => removeFromCart(product)}
                  >
                    Remove From Cart
                  </button>
                ) : (
                  <button
                    className="--btn --btn-danger"
                    onClick={() => addToCart(product)}
                  >
                    Add To Cart
                  </button>
                )}
              </div>
            </div>
          </>
        )}
        {filteredReviews.length > 0 && (
          <Card cardClass={styles.card}>
            <h3>Product Reviews</h3>
            <div>
              {filteredReviews.map((filteredReview) => {
                const { id, rate, review, reviewDate, userName } =
                  filteredReview;
                return (
                  <div key={id} className={styles.review}>
                    <StarsRating value={rate} />
                    <p>{review}</p>
                    <span>
                      <b>{reviewDate}</b>
                    </span>
                    <br />
                    <span>
                      <b>By {userName}</b>
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        )}
      </div>
    </section>
  );
};

export default ProductDetails;
