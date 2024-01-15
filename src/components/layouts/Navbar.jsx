import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { Context } from "../../../context/UserContext";
const Navbar = () => {
  const { authenticated, logout } = useContext(Context);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <Link to='/'>
          <h2>Teste WR</h2>
        </Link>
      </div>
      <ul>
        {authenticated ? (
          <>
            <li>
              <Link to='/dashboard'>Dashboard</Link>
            </li>
            <li onClick={logout}>Sair</li>
          </>
        ) : (
          <>
            <li>
              <Link to='/login'>Entrar</Link>
            </li>
            <li>
              <Link to='/register'>Registrar</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
