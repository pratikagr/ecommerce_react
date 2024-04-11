import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/register", { ...user });
      localStorage.setItem("firstRegister", true);
      window.location.href = "/";
    } catch (e) {
      alert(e.response.data.msg);
    }
  };
  return (
    <div className="register-name">
      <form onSubmit={registerSubmit}>
        <input
          type="text"
          name="name"
          required
          placeholder="Name"
          onChange={onChangeInput}
          value={user.name}
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          onChange={onChangeInput}
          value={user.email}
        />
        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          onChange={onChangeInput}
          value={user.password}
        />
        <div className="row">
          <button type="submit">Register</button>
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
