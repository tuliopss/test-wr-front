import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        <span className='bold'>EmpHub TV</span> &copy; 2024
      </p>
    </footer>
  );
};

export default Footer;
