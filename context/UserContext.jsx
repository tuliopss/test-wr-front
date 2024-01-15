import { createContext } from "react";
import useAuth from "../src/hooks/useAuth";

const Context = createContext();

const UserProvider = ({ children }) => {
  const { authenticated, register, login } = useAuth();

  return (
    <Context.Provider value={{ authenticated, register, login }}>
      {children}
    </Context.Provider>
  );
};
export { Context, UserProvider };
