import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../services/auth.service"; // Adjust the import path as needed
import { isEmail } from "validator";

const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea, #764ba2);
`;

const RegisterBox = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 350px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;

  &:hover {
    background: #5563c1;
  }
`;

const LinkText = styled.p`
  margin-top: 15px;
  font-size: 14px;
  color: #666;

  a {
    color: #667eea;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  margin: 5px 0 0;
`;

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrors({});
    setSuccessful(false);

    // Validate username
    if (username.length < 3 || username.length > 20) {
      setErrors((prev) => ({ ...prev, username: "Username must be between 3 and 20 characters." }));
      return;
    }

    // Validate email
    if (!isEmail(email)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email address." }));
      return;
    }

    // Validate password
    if (password.length < 6 || password.length > 40) {
      setErrors((prev) => ({ ...prev, password: "Password must be between 6 and 40 characters." }));
      return;
    }

    try {
      const response = await AuthService.register(username, email, password);
      setMessage(response.data.message);
      setSuccessful(true);
    } catch (error) {
      const resMessage =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      setMessage(resMessage);
      setSuccessful(false);
    }
  };

  return (
    <RegisterContainer>
      <RegisterBox>
        <Title>Register</Title>
        {message && <p style={{ color: successful ? "green" : "red" }}>{message}</p>}
        <form onSubmit={handleRegister}>
          <Input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {errors.username && <ErrorText>{errors.username}</ErrorText>}
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <ErrorText>{errors.email}</ErrorText>}
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <ErrorText>{errors.password}</ErrorText>}
          <Button type="submit">Register</Button>
        </form>
        <LinkText>
          Already have an account? <Link to="/login">Login</Link>
        </LinkText>
      </RegisterBox>
    </RegisterContainer>
  );
};

export default Register;