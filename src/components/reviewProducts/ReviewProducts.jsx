import { useSelector } from "react-redux";
import styles from "./ReviewProducts.module.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../card/Card";
import StarsRating from "react-star-rate";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";
import useFetchDocument from "../../customHooks/useFetchDocument";
import spinner from "../../assets/spinner.jpg";

const ReviewProducts = () => {
  const { userId, userName } = useSelector((store) => store.auth);
  const { id } = useParams();
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  const [product, setProduct] = useState(null);

  const { document } = useFetchDocument("products", id);

  useEffect(() => {
    setProduct(document);
  }, [document]);

  const handleSubmitReview = (event) => {
    event.preventDefault();

    const today = new Date();
    const date = today.toDateString();
    const reviewConfig = {
      userId,
      userName,
      productID: id,
      rate,
      review,
      reviewDate: date,
      createdAt: Timestamp.now().toDate(),
    };

    try {
      addDoc(collection(db, "reviews"), reviewConfig);
      toast.success("Review submitted.");
      setRate(0);
      setReview("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section>
      {product === null ? (
        <div className={`container ${styles.review} --flex-center`}>
          <img src={spinner} alt="Loading..." width={100} />
        </div>
      ) : (
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
      )}
    </section>
  );
};

export default ReviewProducts;
