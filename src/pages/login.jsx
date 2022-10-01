import React, { useState } from "react";
import { Button } from "react-bootstrap";
import InputWithLabel from "../components/common/InputWithLabel";
import styles from "../styles/login.module.css";
import authServcice from "../services/authService";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handlechange = ({ target }) => {
    const { name, value } = target;
    const data = { ...formData };
    data[name] = value;
    setFormData(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (Object.values(formData).every((item) => item.length > 0)) {
        await authServcice.login(formData);
        window.location = "/home";
      } else {
        alert("Both Fields are Required");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <InputWithLabel
        value={formData.username}
        label="Email"
        required={true}
        name="username"
        type="email"
        placeholder="e.g. example@example.com"
        handleChange={handlechange}
      />

      <InputWithLabel
        value={formData.password}
        label="Password"
        required={true}
        name="password"
        type="password"
        placeholder="Enter Password"
        handleChange={handlechange}
      />

      <Button onClick={handleSubmit}>Login</Button>
    </div>
  );
};

export default Login;
