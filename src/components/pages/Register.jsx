import { useContext, useState } from "react";
import styles from "./Form.module.css";
import { Context } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [user, setUser] = useState({});
  const [permission, setPermission] = useState(false);
  const { register } = useContext(Context);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    // console.log({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (isChecked) {
      console.log("Checkbox selecionado, valor: true");
    } else {
      console.log("Checkbox não selecionado, valor: false");
    }
  };

  const handlePermission = (e) => {
    // console.log(e.target.value);
    setUser({ ...user, permission: e.target.value });
    console.log(user);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (await register(user)) {
      navigate("/dashboard");
    }
    console.log(user);
  };
  return (
    <section>
      <h1>Registre-se!</h1>

      <form onSubmit={handleSubmit} className={styles.form_container}>
        <div className={styles.form_control}>
          <label>Nome:</label>
          <input type='text' name='name' onChange={handleChange} />
        </div>

        <div className={styles.form_control}>
          <label>Email:</label>
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
        <div className={styles.form_control_check}>
          <label>Deseja se cadastrar como administrador?:</label>
          <input
            type='checkbox'
            name='permission'
            // checked={user.permission}
            onChange={handlePermission}
          />
        </div>

        <input type='submit' value='Registrar' />
      </form>
    </section>
  );
};

export default Register;
