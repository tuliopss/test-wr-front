import { useEffect, useState } from "react";
import api from "../../utils/api";
import useFlashMessage from "./useFlashMessage";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      setAuthenticated(true);
    }
  }, []);

  const register = async (user) => {
    let msgText = "Usuário registrado com sucesso!";
    let msgType = "success";

    try {
      const data = await api
        .post("/employee/register", user)
        .then((response) => {
          return response.data;
        });

      await authUser(data);
    } catch (error) {
      msgText = response.data.errors[0];
      msgType = "error";
    }

    setFlashMessage(msgText, msgType);
  };

  const login = async (user) => {
    let msgText = "Usuário logado com sucesso!";
    let msgType = "success";

    try {
      const data = await api.post("/employee/login", user).then((response) => {
        return response.data;
      });

      await authUser(data);
    } catch (error) {
      msgText = response.data.errors[0];
      msgType = "error";
    }

    setFlashMessage(msgText, msgType);
  };

  const authUser = async (data) => {
    setAuthenticated(true);

    localStorage.setItem("token", JSON.stringify(data.token));

    navigate("/dashboard");
  };

  return { register, login };
}
