import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea, #764ba2);
`;

const LoginBox = styled.div`
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate authentication (replace with actual API call)
    if (email === "test@example.com" && password === "password") {
      alert("Login Successful!");
      navigate("/dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <LoginContainer>
      <LoginBox>
        <Title>Login</Title>
        <form onSubmit={handleLogin}>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Login</Button>
        </form>
        <LinkText>
          Don't have an account? <a href="/register">Register</a>
        </LinkText>
      </LoginBox>
    </LoginContainer>
  );
};

export default Login;
