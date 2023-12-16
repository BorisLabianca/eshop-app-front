import { useEffect } from "react";
import useFetchCollection from "../../customHooks/useFetchCollection";
import styles from "./OrderHistory.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { STORE_ORDERS } from "../../redux/features/orderSlice";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading } = useFetchCollection("orders");
  const orders = useSelector((store) => store.orders.orderHistory);
  const { userId } = useSelector((store) => store.auth);

  const handleClick = (id) => {
    navigate(`/order-details/${id}`);
  };

  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [dispatch, data]);

  const filteredOrders = orders.filter((order) => order.userId === userId);
  return (
    <section>
      <div className={`container ${styles.order}`}>
        <h2>My Order History</h2>
        <p>
          Open an order to leave a <b>Product Review.</b>
        </p>
        <br />
        <>
          {isLoading && <Loader />}
          <div className={styles.table}>
            {filteredOrders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Date</th>
                    <th>Order ID</th>
                    <th>Order Amount</th>
                    <th>Order Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, index) => {
                    const {
                      id,
                      orderDate,
                      orderTime,
                      orderAmount,
                      orderStatus,
                    } = order;
                    return (
                      <tr key={id} onClick={() => handleClick(id)}>
                        <td>
                          <b>{index + 1}</b>
                        </td>
                        <td>
                          {orderDate} at {orderTime}
                        </td>
                        <td>{id}</td>
                        <td>${orderAmount}</td>
                        <td>
                          <p
                            className={
                              orderStatus === "Order placed"
                                ? styles.pending
                                : orderStatus === "Processing"
                                ? styles.processing
                                : orderStatus === "Shipped"
                                ? styles.shipped
                                : styles.delivered
                            }
                          >
                            {orderStatus}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>
      </div>
    </section>
  );
};

export default OrderHistory;
