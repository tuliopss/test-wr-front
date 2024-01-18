import React, { useEffect, useState } from "react";
import api from "../../../utils/api";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./Form.module.css";
import useFlashMessage from "../../hooks/useFlashMessage";

const EditEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();
  const [token] = useState(localStorage.getItem("token") || "");
  const getEmployee = async () => {
    await api
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

  useEffect(() => {
    getEmployee();
  }, [id]);

  const editEmployee = async (emp) => {
    let msgType = "success";
    let msgText = "Funcionário editado com sucesso.";

    try {
      await api
        .patch(`/employee/edit/${id}`, emp, {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        })
        .then((response) => {
          console.log(response.data);
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

  return (
    <>
      <h2>Edite as informações do funcionário</h2>
      <form onSubmit={handleSubmit} className={styles.form_container}>
        <div className={styles.form_control}>
          <label htmlFor='name'>Nome do funcionário</label>
          <input
            className='input'
            type='text'
            name='name'
            placeholder='Nome'
            value={employee.name}
            onChange={handleChange}
          />
        </div>

        <div className={styles.form_control}>
          <label htmlFor='email'>Email do funcionário</label>
          <input
            className='input'
            type='email'
            name='email'
            placeholder='Email do funcionário'
            value={employee.email}
            onChange={handleChange}
          />
        </div>

        <div className={styles.form_control}>
          <label htmlFor='cpf'>CPF do funcionário</label>
          <input
            disabled
            className='input'
            type='text'
            name='cpf'
            maxLength={11}
            placeholder='CPF do funcionário'
            value={employee.cpf}
          />
        </div>

        <div className={styles.form_control}>
          <label htmlFor='role'>Função do funcionário</label>
          <input
            className='input'
            type='text'
            name='role'
            placeholder='Função do funcionário'
            min={2}
            value={employee.role}
            onChange={handleChange}
          />
        </div>
        <input type='submit' value='Editar' />
      </form>
      {/* <form onSubmit={handleSubmit} className={styles.form_container}>
        <div className={styles.form_control}>
          <label htmlFor='name'>Nome do funcionário</label>
          <input
            className='input'
            type='text'
            name='name'
            placeholder='Nome'
            onChange={handleChange}
            // value={employee.name}
          />
        </div>

        <div className={styles.form_control}>
          <label htmlFor='email'>Email do funcionário</label>
          <input
            className='input'
            type='email'
            name='email'
            placeholder='Email do funcionário'
            onChange={handleChange}
          />
        </div>

        <div className={styles.form_control}>
          <label htmlFor='cpf'>CPF do funcionário</label>
          <input
            className='input'
            type='text'
            name='cpf'
            maxLength={11}
            placeholder='CPF do funcionário'
            onChange={handleChange}
          />
        </div>

        <div className={styles.form_control}>
          <label htmlFor='role'>Função do funcionário</label>
          <input
            className='input'
            type='text'
            name='role'
            placeholder='Função do funcionário'
            min={2}
            onChange={handleChange}
          />
        </div>
        <input
          // className={styles.btn_submit_form}
          type='submit'
          value='Editar'
        />
      </form> */}
    </>
  );
};

export default EditEmployee;
