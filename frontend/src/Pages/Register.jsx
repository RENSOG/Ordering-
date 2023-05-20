import React, { useState } from 'react';
import axios from 'axios';
import "./Register.css"
import {useNavigate} from "react-router-dom"

 function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const navigate = useNavigate();
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create an object with the data to send to the backend
    const data = {
      username: username,
      password: password,
      email:email
    };

    // Send the data to the backend using axios
    axios.post('http://localhost:2000/register', data)
      .then((response) => {
        // Handle the response from the back
        console.log(response.data);
        if (response.data.success) {
            alert("registered successfully")
          navigate("/")
          
        }
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{backgroundColor:"black"}}>
      <div className="box">
        <div className="form">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="inputBox">
              <input type="text" value={username} onChange={handleUsernameChange} required />
              <span>Username</span>
              <i></i>
            </div>
            <div className="inputBox">
              <input type="password" value={password} onChange={handlePasswordChange} required />
              <span>Password</span>
              <i></i>
            </div>
            <div className="inputBox">
              <input type="email" value={email} onChange={handleEmailChange} required />
              <span>Password</span>
              <i></i>
            </div>
            <div className="links">
              <a href="#">Forgot Password</a>
              <a href="/">Signup</a>
            </div>
            <input type="submit" value="Register" onClick={handleSubmit} />
          </form>
        </div>
      </div>
    </div>
  );
}
export default Register;

