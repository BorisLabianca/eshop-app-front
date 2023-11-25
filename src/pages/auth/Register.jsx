import registerImg from "../../assets/register.png";
import { Link } from "react-router-dom";
import styles from "./auth.module.scss";
import { FaGoogle } from "react-icons/fa";
import Card from "../../components/card/Card";

const Register = () => {
  return (
    <section className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <h2>Register</h2>
          <form>
            <input type="text" placeholder="Username" required />
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <input type="password" placeholder="Confirm Password" required />
            <button className="--btn --btn-primary --btn-block">Sign Up</button>
            <div className={styles.links}>
              <Link to="/reset-password">Forgot Password?</Link>
            </div>
            <p>-- or --</p>
          </form>
          <button className="--btn --btn-danger --btn-block">
            <FaGoogle color="#fff" /> Sign Up With Google
          </button>
          <span className={styles.register}>
            <p>Already have an account?</p>
            <Link to="/login">Login</Link>
          </span>
        </div>
      </Card>
      <div className={styles.img}>
        <img src={registerImg} alt="Login" width="400px" />
      </div>
    </section>
  );
};

export default Register;
