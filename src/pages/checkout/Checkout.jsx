import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import {
  CALCULATE_TOTAL,
  CALCULATE_TOTAL_QUANTITY,
} from "../../redux/features/cartSlice";
import { toast } from "react-toastify";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

const stripePromise = loadStripe(
  import.meta.env.VITE_REACT_APP_STRIPE_PUBLISHABLE_KEY
);

const Checkout = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("Initializing checkout.");
  const [clientSecret, setClientSecret] = useState("");
  const { cartItems, cartTotalAmount } = useSelector((store) => store.cart);
  const { email: customerEmail } = useSelector((store) => store.auth);
  const { shippingAddress, billingAddress } = useSelector(
    (store) => store.checkout
  );

  useEffect(() => {
    dispatch(CALCULATE_TOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch, cartItems]);

  const description = `eShopBLab payment: email: ${customerEmail}, Amount: ${cartTotalAmount}`;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:4000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartItems,
        userEmail: customerEmail,
        shipping: shippingAddress,
        billing: billingAddress,
        description,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        setMessage("Failed to initialize checkout.");
        toast.error("Something went wrong.");
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <section>
        <div className="container">{!clientSecret && <h3>{message}</h3>}</div>
      </section>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};

export default Checkout;
