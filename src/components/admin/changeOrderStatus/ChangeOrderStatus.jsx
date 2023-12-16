import { useState } from "react";
import styles from "./ChangeOrderStatus.module.scss";
import Loader from "../../loader/Loader";
import Card from "../../card/Card";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ChangeOrderStatus = ({ order, id }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateOrder = (event, id) => {
    event.preventDefault();
    setIsLoading(true);
    const orderConfig = {
      userId: order.userId,
      email: order.email,
      orderDate: order.orderDate,
      orderTime: order.orderTime,
      orderAmount: order.orderAmount,
      orderStatus: status,
      cartItems: order.cartItems,
      shippingAddress: order.shippingAddress,
      createdAt: order.createdAt,
      editedAt: Timestamp.now().toDate(),
    };

    try {
      setDoc(doc(db, "orders", id), orderConfig);
      setIsLoading(false);
      toast.success("Order status changed successfully.");
      navigate("/admin/orders");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.status}>
        <Card cardClass={styles.card}>
          <h4>Update Order Status</h4>
          <form onSubmit={(event) => handleUpdateOrder(event, id)}>
            <span>
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              >
                <option value="" disabled>
                  -- Select a status --
                </option>
                <option value="Order placed">Order placed</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </span>
            <span>
              <button className="--btn --btn-primary" type="submit">
                Update Status
              </button>
            </span>
          </form>
        </Card>
      </div>
    </>
  );
};

export default ChangeOrderStatus;
