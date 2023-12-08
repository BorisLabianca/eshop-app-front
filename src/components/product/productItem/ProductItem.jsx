import { Link } from "react-router-dom";
import Card from "../../card/Card";
import styles from "./ProductItem.module.scss";

const ProductItem = ({
  grid,
  product,
  id,
  name,
  price,
  description,
  imageURL,
}) => {
  const shortenText = (text, lngth) => {
    if (text.length > lngth) {
      const shortenedText = text.substring(0, lngth).concat(" ...");
      return shortenedText;
    }
    return text;
  };

  return (
    <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
      <Link to={`/product-details`}>
        <div className={styles.img}>
          <img src={imageURL} alt={name} />
        </div>
      </Link>
      <div className={styles.content}>
        <div className={styles.details}>
          <p>${`${price}`}</p>
          <h4>{shortenText(name, 18)}</h4>
        </div>
        {!grid && (
          <p className={styles.description}>{shortenText(description, 200)}</p>
        )}
        <button className="--btn --btn-danger">Add to Cart</button>
      </div>
    </Card>
  );
};

export default ProductItem;
