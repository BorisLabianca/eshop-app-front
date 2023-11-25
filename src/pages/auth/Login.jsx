import loginImg from "../../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import styles from "./auth.module.scss";
import { FaGoogle } from "react-icons/fa";
import Card from "../../components/card/Card";
import { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loginUser = (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (!email || !password) {
      setIsLoading(false);
      return toast.error("Please fill out all the fields.");
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setIsLoading(false);
        toast.success("Login successfull.");
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  // Google signin
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = (event) => {
    event.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        toast.success("Login successful.");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt="Login" width="400px" />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Login</h2>
            <form onSubmit={loginUser}>
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
              <button className="--btn --btn-primary --btn-block" type="submit">
                Login
              </button>
              <div className={styles.links}>
                <Link to="/reset-password">Forgot Password?</Link>
              </div>
              <p>-- or --</p>
            </form>
            <button
              className="--btn --btn-danger --btn-block"
              onClick={signInWithGoogle}
            >
              <FaGoogle color="#fff" />{" "}
              <p className="--text-light">Login With Google</p>
            </button>
            <span className={styles.register}>
              <p>Don't have an account?</p>
              <Link to="/register">Register</Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
