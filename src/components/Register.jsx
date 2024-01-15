import { useContext, useState } from "react";
import styles from "./Form.module.css";
import { Context } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [user, setUser] = useState({});
  const { register } = useContext(Context);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await register(user);

    navigate("/dashboard");
  };
  return (
    <section>
      <h1>Registre-se!</h1>

      <form onSubmit={handleSubmit}>
        <div className={styles.form_control}>
          <label htmlFor=''>Nome:</label>
          <input type='text' name='name' onChange={handleChange} />
        </div>

        <div className={styles.form_control}>
          <label htmlFor=''>Email:</label>
          <input type='email' name='email' onChange={handleChange} />
        </div>

        <div className={styles.form_control}>
          <label htmlFor=''>CPF:</label>
          <input
            type='text'
            name='cpf'
            maxLength='11'
            onChange={handleChange}
          />
        </div>

        <div className={styles.form_control}>
          <label htmlFor=''>Função:</label>
          <input type='text' name='role' onChange={handleChange} />
        </div>
        <div className={styles.form_control}>
          <label htmlFor=''>Senha:</label>
          <input type='password' name='password' onChange={handleChange} />
        </div>
        <div className={styles.form_control}>
          <label htmlFor=''>Confirme sua senha:</label>
          <input
            type='password'
            name='confirmPassword'
            onChange={handleChange}
          />
        </div>

        <input type='submit' value='Registrar' />
      </form>
    </section>
  );
};

export default Register;
