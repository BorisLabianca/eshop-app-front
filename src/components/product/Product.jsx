import { useDispatch, useSelector } from "react-redux";
import useFetchCollection from "../../customHooks/useFetchCollection";
import styles from "./Product.module.scss";
import ProductFilter from "./productFilter/ProductFilter";
import ProductList from "./productList/ProductList";
import { STORE_PRODUCTS } from "../../redux/features/productSlice";
import { useEffect } from "react";
import spinner from "../../assets/spinner.jpg";

const Product = () => {
  const { data, isLoading } = useFetchCollection("products");
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store.product);

  useEffect(() => {
    dispatch(STORE_PRODUCTS({ products: data }));
  }, [data, dispatch]);

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside className={styles.filter}>
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
        </div>
      </div>
    </section>
  );
};

export default Product;
