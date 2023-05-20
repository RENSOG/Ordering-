import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Food from "./Food.jsx";
import LoginForm from "./Pages/Login";
import Register from "./Pages/Register.jsx";

function App() {
  return (
    <BrowserRouter>
      {" "}
      <Routes>
        
       
            <Route exact path="/" element={<LoginForm/> }/>
            <Route path="/food" element={<Food/>} />
            <Route path="/register" element={<Register/>} />
      

      </Routes>
    </BrowserRouter>
  );
}

export default App;
