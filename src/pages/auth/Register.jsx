import registerImg from "../../assets/register.png";
import { Link, useNavigate } from "react-router-dom";
import styles from "./auth.module.scss";
import Card from "../../components/card/Card";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import Loader from "../../components/loader/Loader";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const registerUser = (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (!email || !password || !confirmPassword) {
      setIsLoading(false);
      return toast.error("Please fill out all the fields.");
    }
    if (password !== confirmPassword) {
      setIsLoading(false);
      return toast.error("Passwords do not match.");
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setIsLoading(false);
        toast.success("Account successfully created.");
        navigate("/login");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <Card>
          <div className={styles.form}>
            <h2>Register</h2>
            <form onSubmit={registerUser}>
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
              <button className="--btn --btn-primary --btn-block" type="submit">
                Sign Up
              </button>
              <div className={styles.links}>
                <Link to="/login">Already have an account?</Link>
              </div>
            </form>
          </div>
        </Card>
        <div className={styles.img}>
          <img src={registerImg} alt="Register" width="400px" />
        </div>
      </section>
    </>
  );
};

export default Register;
