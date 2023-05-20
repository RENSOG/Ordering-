import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";

export const LoginForm=()=> {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create an object with the data to send to the backend
    const data = {
      username: username,
      password: password,
    };

    // Send the data to the backend using axios
    axios
      .post("http://localhost:2000/login", data)
      .then((response) => {
        // Handle the response
        console.log(response.data);
        if (response.data.token) {
          // Store the token in local storage or state variable
          localStorage.setItem("token", response.data.token);
          // Redirect to the "food" page
          navigate("/food");
        }
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="box">
        <div className="form">
          <h2>Sign in</h2>
          <form onSubmit={handleSubmit}>
            <div className="inputBox">
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                required
              />
              <span>Username</span>
              <i></i>
            </div>
            <div className="inputBox">
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <span>Password</span>
              <i></i>
            </div>
            <div className="links">
              <a href="#">Forgot Password</a>
              <a href="/register">Signup</a>
            </div>
            <input type="submit" value="Login" onClick={handleSubmit}/>
          </form>
        </div>
      </div>
    </div>
  );
}
export default LoginForm