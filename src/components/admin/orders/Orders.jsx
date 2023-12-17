import { useDispatch, useSelector } from "react-redux";
import styles from "./Orders.module.scss";
import { useNavigate } from "react-router-dom";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import { STORE_ORDERS } from "../../../redux/features/orderSlice";
import { useEffect } from "react";
import Loader from "../../loader/Loader";

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading } = useFetchCollection("orders");
  const orders = useSelector((store) => store.orders.orderHistory);

  const handleClick = (id) => {
    navigate(`/admin/order-details/${id}`);
  };

  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [dispatch, data]);

  return (
    <>
      <div className={styles.order}>
        <h2>All Orders</h2>
        <p>
          Open an order to <b>Change order status.</b>
        </p>
        <br />
        <>
          {isLoading && <Loader />}
          <div className={styles.table}>
            {orders.length === 0 ? (
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
                  {orders.map((order, index) => {
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
    </>
  );
};

export default Orders;
