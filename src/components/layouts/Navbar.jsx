import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <Link to='/'>
          <h2>Teste WR</h2>
        </Link>
      </div>
      <ul>
        <li>
          <Link to='/dashboard'>Dashboard</Link>
        </li>
        <li>
          <Link to='/login'>Entrar</Link>
        </li>
        <li>
          <Link to='/register'>Registrar</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
