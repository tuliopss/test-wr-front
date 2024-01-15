import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);

  const getEmployees = async () => {
    api.get("/employee").then((response) => {
      setEmployees(response.data);
      console.log(response.data);
      console.log("e", employees);
    });
  };

  useEffect(() => {
    // getEmployees();
    api.get("/employee").then((response) => {
      setEmployees(response.data);
      console.log(response.data);
      console.log("e", employees), [];
    });
  });
  return (
    <>
      <div className={styles.dash}>
        <h2>Dashboard</h2>
      </div>

      <div className={styles.employees_container}>
        {employees.length > 0 &&
          employees.map((emp) => (
            <div className={styles.emp_card} key={emp._id}>
              <h3>{emp.name}</h3>
              <span>{emp.role}</span>
            </div>
          ))}
        {employees.length == 0 && <p>Sem funcionários cadastrados.</p>}
      </div>
    </>
  );
};

export default Dashboard;
