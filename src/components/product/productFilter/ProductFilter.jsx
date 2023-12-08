import { useDispatch, useSelector } from "react-redux";
import styles from "./ProductFilter.module.scss";
import { useEffect, useState } from "react";
import {
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
} from "../../../redux/features/filterSlice";

const ProductFilter = () => {
  const { products } = useSelector((store) => store.product);
  const { minPrice, maxPrice } = useSelector((store) => store.product);
  const dispatch = useDispatch();
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState(0);

  const allCategories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const allBrands = [
    "All",
    ...new Set(products.map((product) => product.brand)),
  ];

  const filterByCategory = (cat) => {
    setCategory(cat);
    dispatch(FILTER_BY_CATEGORY({ products, category: cat }));
  };

  useEffect(() => {
    dispatch(FILTER_BY_BRAND({ products, brand }));
  }, [dispatch, products, brand]);

  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ products, price }));
  }, [dispatch, products, price]);

  const clearFilters = () => {
    setCategory("All");
    setBrand("All");
    setPrice(maxPrice);
  };

  return (
    <div className={styles.filter}>
      <h4>Categories</h4>
      <div className={styles.category}>
        {allCategories.map((cat, index) => {
          return (
            <button
              className={category === cat ? `${styles.active}` : null}
              key={index}
              type="button"
              onClick={() => filterByCategory(cat)}
            >
              &#8250; {cat}
            </button>
          );
        })}
      </div>
      <h4>Brand</h4>
      <div className={styles.brand}>
        <select
          name="brand"
          value={brand}
          onChange={(event) => setBrand(event.target.value)}
        >
          {allBrands.map((brand, index) => {
            return (
              <option value={brand} key={index}>
                {brand}
              </option>
            );
          })}
        </select>
      </div>
      <h4>Price</h4>
      <p>${price}</p>
      <div className={styles.price}>
        <input
          type="range"
          name="price"
          min={minPrice}
          max={maxPrice}
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
      </div>
      <br />
      <button className="--btn --btn-danger" onClick={clearFilters}>
        Clear Filter
      </button>
    </div>
  );
};

export default ProductFilter;
