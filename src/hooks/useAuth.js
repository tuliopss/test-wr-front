import { useEffect, useState } from "react";
import api from "../../utils/api";
import useFlashMessage from "./useFlashMessage";

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
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
      msgText = error.response.data.errors[0];
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
      msgText = error.response.data.errors[0];
      msgType = "error";
    }

    setFlashMessage(msgText, msgType);
  };

  const authUser = async (data) => {
    setAuthenticated(true);

    localStorage.setItem("token", JSON.stringify(data.token));
  };

  const logout = async () => {
    const msgText = "Logout realizado com sucesso! Volte em breve!";
    const msgType = "success";

    setAuthenticated(false);

    localStorage.removeItem("token");

    api.defaults.headers.authorization = undefined;

    setFlashMessage(msgText, msgType);
    // navigate("/");
  };
  console.log(authenticated, "auth");
  return { authenticated, register, login, logout };
}
