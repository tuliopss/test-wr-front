import { useContext, useState } from "react";
import styles from "./Form.module.css";
import { Context } from "../../context/UserContext";
const Register = () => {
  const [user, setUser] = useState({});
  const { register } = useContext(Context);
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await register(user);
  };
  return (
    <section>
      <h1>Registre-se!</h1>

      <form onSubmit={handleSubmit}>
        <div className={styles.form_control}>
          <label htmlFor=''>Nome:</label>
          <input type='text' name='name' />
        </div>

        <div className={styles.form_control}>
          <label htmlFor=''>Email:</label>
          <input type='email' name='email' />
        </div>

        <div className={styles.form_control}>
          <label htmlFor=''>CPF:</label>
          <input type='text' name='cpf' maxLength='11' />
        </div>

        <div className={styles.form_control}>
          <label htmlFor=''>Função:</label>
          <input type='text' name='role' />
        </div>
        <div className={styles.form_control}>
          <label htmlFor=''>Senha:</label>
          <input type='password' name='password' />
        </div>
        <div className={styles.form_control}>
          <label htmlFor=''>Confirme sua senha:</label>
          <input type='password' name='confirmPassword' />
        </div>

        <input type='submit' value='Registrar' />
      </form>
    </section>
  );
};

export default Register;
