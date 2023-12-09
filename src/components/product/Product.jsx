import { useDispatch, useSelector } from "react-redux";
import useFetchCollection from "../../customHooks/useFetchCollection";
import styles from "./Product.module.scss";
import ProductFilter from "./productFilter/ProductFilter";
import ProductList from "./productList/ProductList";
import {
  STORE_PRODUCTS,
  GET_PRICE_RANGE,
} from "../../redux/features/productSlice";
import { useEffect, useState } from "react";
import spinner from "../../assets/spinner.jpg";
import { FaCogs } from "react-icons/fa";

const Product = () => {
  const { data, isLoading } = useFetchCollection("products");
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store.product);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    dispatch(STORE_PRODUCTS({ products: data }));
    dispatch(GET_PRICE_RANGE({ products: data }));
  }, [data, dispatch]);

  const toggleFilters = () => {
    setShowFilter(!showFilter);
  };

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside
          className={
            showFilter ? `${styles.filter} ${styles.show}` : `${styles.filter}`
          }
        >
          <ProductFilter />
        </aside>
        <div className={styles.content}>
          {isLoading ? (
            <img
              src={spinner}
              alt="Loading..."
              style={{ width: "50px" }}
              className="--center-all"
            />
          ) : (
            <ProductList products={products} />
          )}
          <div className={styles.icon} onClick={toggleFilters}>
            <FaCogs color="orangered" size={20} />
            <p>
              <b>{showFilter ? "Hide Filters" : "Show Filters"}</b>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
