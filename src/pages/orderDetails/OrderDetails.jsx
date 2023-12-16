import { Link, useParams } from "react-router-dom";
import styles from "./OrderDetails.module.scss";
import useFetchDocument from "../../customHooks/useFetchDocument";
import spinner from "../../assets/spinner.jpg";
import { useEffect, useState } from "react";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const { document } = useFetchDocument("orders", id);

  useEffect(() => {
    setOrder(document);
  }, [document]);
  console.log(order);

  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Order Details</h2>
        <div>
          <Link to="/order-history">&larr; Back To Orders;</Link>
        </div>
        <br />
        {order === null ? (
          <img src={spinner} alt="Loading..." width={50} />
        ) : (
          <>
            <p>
              <b>Order ID: </b>
              {order.id}
            </p>
            <p>
              <b>Order Amount: </b>${order.orderAmount}
            </p>
            <p>
              <b>Order Status: </b>
              {order.orderStatus}
            </p>
            <br />
            <table>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {order.cartItems.map((item, index) => {
                  const { id, name, price, imageURL, cartQuantity } = item;
                  return (
                    <tr key={id}>
                      <td>
                        <b>{index + 1}</b>
                      </td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img src={imageURL} alt={name} width={100} />
                      </td>
                      <td>${price}</td>
                      <td>{cartQuantity}</td>
                      <td>${(price * cartQuantity).toFixed(2)}</td>
                      <td className={styles.icons}>
                        <button className="--btn --btn-primary --text-light">
                          <Link
                            to={`/review-product/${id}`}
                            className="--text-light"
                          >
                            Review Product
                          </Link>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </section>
  );
};

export default OrderDetails;
