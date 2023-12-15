import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  CALCULATE_TOTAL,
  CALCULATE_TOTAL_QUANTITY,
} from "../../redux/features/cartSlice";

const CheckoutSuccess = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(CALCULATE_TOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch]);

  return (
    <section>
      <div className="container">
        <h2>Checkout Successful</h2>
        <p>Thank you for your purchase.</p>
        <br />
        <Link to="/order-history">
          <button className="--btn --btn-primary">View Order Status</button>
        </Link>
      </div>
    </section>
  );
};

export default CheckoutSuccess;
