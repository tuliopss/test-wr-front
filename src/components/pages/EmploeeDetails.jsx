import React, { useEffect } from "react";
import { useState } from "react";
import api from "../../../utils/api";
import { useParams } from "react-router-dom";

const EmploeeDetails = () => {
  const [employee, setEmployee] = useState({});
  const { id } = useParams();
  const [token] = useState(localStorage.getItem("token") || "");

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

  useEffect(() => {
    getEmployeeById();
  });
  return <h1>{employee.name}</h1>;
};

export default EmploeeDetails;
