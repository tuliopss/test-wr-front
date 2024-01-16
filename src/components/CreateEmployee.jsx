import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { useNavigate, useParams } from "react-router-dom";

// import styles from "./AddTurma.module.css";
import useFlashMessage from "../hooks/useFlashMessage";

const CreateEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();
  const [token] = useState(localStorage.getItem("token") || "");

  const createEmployee = async (emp) => {
    let msgType = "success";
    let msgText = "Funcionário registrado com sucesso.";

    try {
      await api
        .post(`/employee/create`, emp, {
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createEmployee(employee);
  };

  //className={FormStyles.form_container}
  return (
    <>
      <h2>Insira as informações do funcionário</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Nome do funcionário</label>
          <input
            className='input'
            type='text'
            name='name'
            placeholder='Nome'
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor='email'>Email do funcionário</label>
          <input
            className='input'
            type='email'
            name='email'
            placeholder='Email do funcionário'
            onChange={handleChange}
          />
        </div>

        <div>
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

        <div>
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
          value='Criar'
        />
      </form>
    </>
  );
};

export default CreateEmployee;
