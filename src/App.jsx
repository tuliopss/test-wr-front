import { useContext, useState } from "react";

import "./App.css";
import Container from "./components/layouts/Container";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Teste from "./components/Teste";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Register from "./components/Register";
import { Context, UserProvider } from "../context/UserContext";
import Message from "./components/layouts/Message";
import Login from "./components/Login";
import EmploeeDetails from "./components/EmploeeDetails";
import EditEmployee from "./components/EditEmployee";
import CreateEmployee from "./components/CreateEmployee";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar />
        <Message />
        <Container>
          {/* <h1>APP</h1> */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/edit/:id' element={<EditEmployee />} />
            <Route path='/employee/:id' element={<EmploeeDetails />} />
            <Route path='/create' element={<CreateEmployee />} />

            <Route path='/teste' element={<Teste />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
