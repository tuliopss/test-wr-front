import { createContext } from "react";
import useAuth from "../src/hooks/useAuth";

const Context = createContext();

const UserProvider = ({ children }) => {
  const { authenticated, register, login, logout } = useAuth();

  return (
    <Context.Provider value={{ authenticated, register, login, logout }}>
      {children}
    </Context.Provider>
  );
};
export { Context, UserProvider };
