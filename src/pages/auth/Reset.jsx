import resetImg from "../../assets/forgot.png";
import { Link } from "react-router-dom";
import styles from "./auth.module.scss";
import { FaGoogle } from "react-icons/fa";
import Card from "../../components/card/Card";

const Reset = () => {
  return (
    <section className={`container ${styles.auth}`}>
      <div className={styles.img}>
        <img src={resetImg} alt="Login" width="400px" />
      </div>
      <Card>
        <div className={styles.form}>
          <h2>Reset Password</h2>
          <form>
            <input type="email" placeholder="Email" required />
            <button className="--btn --btn-primary --btn-block">Login</button>
            <div className={styles.links}>
              <p>
                <Link to="/login">Login</Link>
              </p>
              <p>
                <Link to="/register">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </section>
  );
};

export default Reset;
