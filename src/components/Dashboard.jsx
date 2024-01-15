import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const [employees, setEmployees] = useState([]);

  const getEmployees = () => {
    api.get("/employee").then((response) => {
      setEmployees(response.data);
      console.log(response.data);
      console.log("e", employees);
    });
  };

  useEffect(() => {
    // getEmployees();
    getEmployees();
  }, []);
  return (
    <>
      <div className={styles.dash}>
        <h2>Dashboard</h2>
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
                <button>Editar</button>
                <button>Excluir</button>
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
