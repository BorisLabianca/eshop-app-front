import useFetchCollection from "../../customHooks/useFetchCollection";
import styles from "./OrderHistory.module.scss";

const OrderHistory = () => {
  const { data, isLoading } = useFetchCollection("orders");
  console.log(data);
  return <section>OrderHistory</section>;
};

export default OrderHistory;
