import React, { useEffect } from "react";
import { useState } from "react";
import api from "../../../utils/api";
import { useParams } from "react-router-dom";
import styles from "./EmploeeDetails.module.css";
import stylesForm from "./Form.module.css";
import useFlashMessage from "../../hooks/useFlashMessage";
const Profile = () => {
  const [employee, setEmployee] = useState({});
  const { id } = useParams();
  const [token] = useState(localStorage.getItem("token") || "");

  const { setFlashMessage } = useFlashMessage();

  const getEmployeeById = () => {
    api
      .get(`/employee/getProfile`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setEmployee(response.data);
        console.log(employee);
      });
  };

  const editEmployee = async (emp) => {
    let msgType = "success";
    let msgText = "Funcionário editado com sucesso.";

    try {
      await api
        .patch(`/employee/edit/${emp._id}`, emp, {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        })
        .then((response) => {
          return response.data;
        });
      setFlashMessage(msgText, msgType);
      navigate("/dashboard");
    } catch (error) {
      msgType = "error";
      msgText = error.response.data.errors[0];

      setFlashMessage(msgText, msgType);
    }
  };

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
    console.log(employee);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editEmployee(employee);
  };

  useEffect(() => {
    getEmployeeById();
  }, [token]);
  return (
    <section className={styles.emp_card}>
      <div className={styles.card_row}>
        <p>Nome:</p> <span>{employee.name}</span>
      </div>

      <div className={styles.card_row}>
        <p>Função:</p> <span>{employee.role}</span>
      </div>

      <div className={styles.card_row}>
        <p>E-mail:</p> <span>{employee.email}</span>
      </div>

      <div className={styles.card_row}>
        <p>CPF:</p> <span>{employee.cpf}</span>
      </div>
      <div className={styles.card_row}>
        <p>Admin:</p> <span>{employee.permission ? "Sim" : "Não"}</span>
      </div>

      <form className={stylesForm.form_container} onSubmit={handleSubmit}>
        <div className={stylesForm.form_control}>
          <label>Senha:</label>
          <input type='password' name='password' onChange={handleChange} />
        </div>
        <div className={stylesForm.form_control}>
          <label>Confirme sua senha:</label>
          <input
            type='password'
            name='confirmPassword'
            onChange={handleChange}
          />
          <input type='submit' value='Registrar' />
        </div>
      </form>
    </section>
  );
};

export default Profile;
