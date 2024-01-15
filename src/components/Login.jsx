import { useContext, useState } from "react";
import styles from "./Form.module.css";
import { Context } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [user, setUser] = useState({});
  const { login } = useContext(Context);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(user);
    navigate("/dashboard");
  };
  return (
    <section>
      <h1>Login!</h1>

      <form onSubmit={handleSubmit}>
        <div className={styles.form_control}>
          <label htmlFor=''>Email:</label>
          <input type='email' name='email' onChange={handleChange} />
        </div>

        <div className={styles.form_control}>
          <label htmlFor=''>Senha:</label>
          <input type='password' name='password' onChange={handleChange} />
        </div>

        <input type='submit' value='Entrar' />
      </form>
    </section>
  );
};

export default Login;
