import { AiFillDollarCircle } from "react-icons/ai";
import InfoBox from "../../infoBox/InfoBox";
import styles from "./Home.module.scss";
import { BsCart4 } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import { useEffect } from "react";
import { STORE_PRODUCTS } from "../../../redux/features/productSlice";
import {
  CALCULATE_TOTAL_ORDER_AMOUNT,
  STORE_ORDERS,
} from "../../../redux/features/orderSlice";
import Chart from "../../chart/Chart";

const earningIcon = <AiFillDollarCircle size={30} color="#b624ff" />;
const productIcon = <BsCart4 size={30} color="#1f93ff" />;
const orderIcon = <FaCartArrowDown size={30} color="orangered" />;

const Home = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store.product);
  const { orderHistory, totalOrderAmount } = useSelector(
    (store) => store.orders
  );
  const fbProducts = useFetchCollection("products");
  const { data } = useFetchCollection("orders");

  useEffect(() => {
    dispatch(STORE_PRODUCTS({ products: fbProducts.data }));
    dispatch(STORE_ORDERS(data));
    dispatch(CALCULATE_TOTAL_ORDER_AMOUNT());
  }, [dispatch, data, fbProducts]);

  return (
    <div className={styles.home}>
      <h2>Admin Home</h2>
      <div className={styles["info-box"]}>
        <InfoBox
          cardClass={`${styles.card} ${styles.card1}`}
          title={"Earnings"}
          count={totalOrderAmount}
          icon={earningIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card2}`}
          title={"Products"}
          count={products.length}
          icon={productIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card3}`}
          title={"Orders"}
          count={orderHistory.length}
          icon={orderIcon}
        />
      </div>
      <div>
        <Chart />
      </div>
    </div>
  );
};

export default Home;
