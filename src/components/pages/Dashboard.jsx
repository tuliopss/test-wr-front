import React, { useEffect, useState } from "react";
import api from "../../../utils/api";
import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import useFlashMessage from "../../hooks/useFlashMessage";
const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [token] = useState(localStorage.getItem("token"));
  const { setFlashMessage } = useFlashMessage();

  const getEmployees = async () => {
    await api.get("/employee").then((response) => {
      setEmployees(response.data);
    });
  };

  const deleteEmployee = async (id) => {
    let msgText = "Usuário excluido com sucesso!";
    let msgType = "success";

    try {
      const data = await api
        .delete(`/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        })
        .then((response) => {
          const updatedEmployee = employees.filter((emp) => emp._id != id);

          setEmployees(updatedEmployee);
          return response.data;
        });
    } catch (error) {
      msgText = error.response.data.errors[0];
      msgType = "error";
    }
    setFlashMessage(msgText, msgType);
  };

  useEffect(() => {
    // getEmployees();
    getEmployees();
  }, []);
  return (
    <>
      <div className={styles.dash}>
        <h2>Dashboard</h2>
        <Link to='/create'>
          <button>Registrar novo funcionário</button>
        </Link>
      </div>

      <div className={styles.employees_container}>
        {employees.length > 0 &&
          employees.map((emp) => (
            <div className={styles.emp_card} key={emp._id}>
              <div className={styles.emp_info}>
                <span>Nome</span>
                <span>{emp.name}</span>
              </div>

              <div className={styles.actions}>
                <Link to={`/edit/${emp._id}`}>Editar</Link>

                <button
                  onClick={() => {
                    deleteEmployee(emp._id);
                  }}>
                  Excluir
                </button>
                <Link to={`/employee/${emp._id}`}>Ver mais</Link>
              </div>
            </div>
          ))}
        {employees.length == 0 && <p>Sem funcionários cadastrados.</p>}
      </div>
    </>
  );
};

export default Dashboard;
