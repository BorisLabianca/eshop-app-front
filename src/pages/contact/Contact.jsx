import { FaEnvelope, FaGithub, FaPhoneAlt } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import Card from "../../components/card/Card";
import styles from "./Contact.module.scss";
import emailjs from "@emailjs/browser";
import { useRef } from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const form = useRef();
  const sendEmail = (event) => {
    event.preventDefault();

    emailjs
      .sendForm(
        "service_e1a402i",
        "template_desirjg",
        form.current,
        "n-fp_YKPBDTIHt-vN"
      )
      .then(
        (result) => {
          toast.success("Message sent successfully.");
          console.log(result.text);
        },
        (error) => {
          toast.error(error.text);
          // console.log(error.text);
        }
      );
    event.target.reset();
  };

  return (
    <section>
      <div className={`container ${styles.contact}`}>
        <h2>Contact Us</h2>
        <div className={styles.section}>
          <form onSubmit={sendEmail} ref={form}>
            <Card cardClass={styles.card}>
              <label>Name:</label>
              <input
                type="text"
                name="user_name"
                placeholder="Full Name"
                required
              />
              <label>Email:</label>
              <input
                type="email"
                name="user_email"
                placeholder="Your email"
                required
              />
              <label>Subject:</label>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
              />
              <label>Message:</label>
              <textarea name="message" cols="30" rows="10"></textarea>
              <button className="--btn --btn-primary">Send Message</button>
            </Card>
          </form>
          <div className={styles.details}>
            <Card cardClass={styles.card2}>
              <h3>Our contact information</h3>
              <p>
                Fill the form or contact us via other channels listed below.
              </p>
              <div className={styles.icons}>
                <span>
                  <FaPhoneAlt />
                  <p>+8618301979772</p>
                </span>
                <span>
                  <FaEnvelope /> <p>support@eshopblab.com</p>
                </span>
                <span>
                  <GoLocation /> <p>Shanghai, China</p>
                </span>
                <span>
                  <FaGithub /> <p>github.com/BorisLabianca</p>
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
