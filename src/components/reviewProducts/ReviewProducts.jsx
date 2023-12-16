import { useSelector } from "react-redux";
import styles from "./ReviewProducts.module.scss";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../card/Card";
import StarsRating from "react-star-rate";

const ReviewProducts = () => {
  const { products } = useSelector((store) => store.product);
  const { userId, userName } = useSelector((store) => store.auth);
  const { id } = useParams();
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  const product = products.find((item) => item.id === id);

  const handleSubmitReview = (event) => {
    event.preventDefault();
    console.log(rate, review);
  };

  return (
    <section>
      <div className={`container ${styles.review}`}>
        <h2>Review Product</h2>
        <p>
          <b>Product Name: </b>
          {product.name}
        </p>
        <img src={product.imageURL} alt={product.name} width={100} />

        <Card cardClass={styles.card}>
          <form onSubmit={(event) => handleSubmitReview(event)}>
            <label>Rating:</label>
            <StarsRating
              value={rate}
              onChange={(rate) => {
                setRate(rate);
              }}
            />
            <label>Review:</label>
            <textarea
              cols="30"
              rows="10"
              value={review}
              required
              onChange={(event) => {
                setReview(event.target.value);
              }}
            ></textarea>
            <button className="--btn --btn-primary" type="submit">
              Submit Review
            </button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default ReviewProducts;
