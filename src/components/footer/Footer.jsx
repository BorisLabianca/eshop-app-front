/* eslint-disable react/prop-types */
import { FaGithub, FaLinkedin } from "react-icons/fa";
import styles from "./Footer.module.scss";

const date = new Date();
const year = date.getFullYear();

const Footer = ({ tech, techSite, author, linkedin }) => {
  return (
    <div className={styles.footer}>
      &copy; {year} Made with{" "}
      <a href={techSite} target="_blank" rel="noreferrer">
        {" "}
        {tech}{" "}
      </a>{" "}
      by{" "}
      <a href={linkedin} target="_blank" rel="noreferrer">
        {" "}
        {author}{" "}
      </a>{" "}
      <a
        href="https://github.com/BorisLabianca"
        target="_blank"
        rel="noreferrer"
      >
        <FaGithub />
      </a>
      <a href={linkedin} target="_blank" rel="noreferrer">
        <FaLinkedin />
      </a>{" "}
    </div>
  );
};

export default Footer;
