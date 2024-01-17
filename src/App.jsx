import { useContext, useEffect, useState } from "react";

import "./App.css";
import Container from "./components/layouts/Container";
import { io } from "socket.io-client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Teste from "./components/Teste";
import Dashboard from "./components/pages/Dashboard";
import Home from "./components/pages/Home";
import Register from "./components/pages/Register";
import { Context, UserProvider } from "../context/UserContext";
import Message from "./components/layouts/Message";
import Login from "./components/pages/Login";
import EmploeeDetails from "./components/pages/EmploeeDetails";
import EditEmployee from "./components/pages/EditEmployee";
import CreateEmployee from "./components/pages/CreateEmployee";
import Footer from "./components/layouts/Footer";
import Profile from "./components/pages/Profile";

function App() {
  const { authenticated } = useContext(Context);
  const [authenticatedState] = useState(authenticated);

  // useEffect(() => {
  //   const socket = io.connect("http://localhost:3000");
  //   console.log("front", socket);

  //   socket.on("connection", () => {
  //     console.log("on");
  //   });
  // }, []);
  // console.log(authenticated, "a");
  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar />
        <Message />
        <Container>
          {/* <h1>APP</h1> */}
          <Routes>
            {/* {authenticated ? ( */}

            <Route
              path='/dashboard'
              element={authenticated ? <Dashboard /> : <Navigate to='/login' />}
            />

            <Route
              path='/edit/:id'
              element={
                authenticated ? <EditEmployee /> : <Navigate to='/login' />
              }
            />
            <Route
              path='/employee/:id'
              element={
                authenticated ? <EmploeeDetails /> : <Navigate to='/login' />
              }
            />
            <Route
              path='/create'
              element={
                authenticated ? <CreateEmployee /> : <Navigate to='/login' />
              }
            />

            <Route
              path='/profile'
              element={authenticated ? <Profile /> : <Navigate to='/login' />}
            />

            {/* ) : ( */}

            <Route
              path='/register'
              element={!authenticated ? <Register /> : <Navigate to='/' />}
            />
            <Route
              path='/login'
              element={!authenticated ? <Login /> : <Navigate to='/' />}
            />
            <Route path='/' element={<Home />} />

            {/*  )} */}
            <Route path='/teste' element={<Teste />} />
          </Routes>
        </Container>
      </BrowserRouter>
      <Footer />
    </UserProvider>
  );
}

export default App;
