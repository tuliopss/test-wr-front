import { useState } from "react";

import "./App.css";
import Container from "./components/layouts/Container";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Teste from "./components/Teste";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Register from "./components/Register";
import { UserProvider } from "../context/UserContext";
import Message from "./components/layouts/Message";

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
            <Route path='/teste' element={<Teste />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
