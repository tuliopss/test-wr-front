import React, { useEffect } from "react";
import { useState } from "react";
import api from "../../../utils/api";
import { useParams } from "react-router-dom";
import styles from "./EmploeeDetails.module.css";
import useFlashMessage from "../../hooks/useFlashMessage";
const EmploeeDetails = () => {
  const [employee, setEmployee] = useState({});
  const { id } = useParams();
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();
  const getEmployeeById = () => {
    api
      .get(`/employee/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setEmployee(response.data);
        console.log(employee);
      });
  };

  const handlePermission = async () => {
    let msgText = "Permissões de Admin concedidas com sucesso!";
    let msgType = "success";

    try {
      const response = await api.patch(`/employee/permission/${employee._id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });
      return response.data;
    } catch (error) {
      msgText = error.response.data.errors[0];
      msgType = "error";
    }

    setFlashMessage(msgText, msgType);
  };

  useEffect(() => {
    getEmployeeById();
  }, [id, employee]);
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

      {!employee.permission && (
        <button className={styles.btn_permission} onClick={handlePermission}>
          Conceder permissões de administrador
        </button>
      )}
    </section>
  );
};

export default EmploeeDetails;
