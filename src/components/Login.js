import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea, #764ba2);
  overflow: hidden; // Prevent container overflow
`;

const LoginBox = styled.div`
  background: white;
  padding: 4rem 2rem 2rem; // Increased top padding to accommodate the profile image
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 350px;
  position: relative;
  overflow: visible; // Ensure content is not clipped
`;

const ProfileLink = styled.a`
  position: absolute;
  top: -60px; // Adjusted to move the image higher
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #fff;
  padding: 5px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: 0.3s;
  z-index: 10; // Ensure it stays above other elements

  &:hover {
    transform: translateX(-50%) scale(1.05);
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%; 
`;

const Title = styled.h2`
  margin: 20px 0;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box; // Ensure padding and border are included in width
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;
  opacity: ${props => (props.disabled ? 0.7 : 1)};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: #5563c1;
  }
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ErrorMessage = styled.div`
  background: #ffebee;
  color: #c62828;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (!username || !password) {
      setMessage("Username and password are required");
      setLoading(false);
      return;
    }

    AuthService.login(username, password)
      .then(() => {
        navigate("/dashboard");
        window.location.reload();
      })
      .catch((error) => {
        const resMessage =
          (error.response?.data?.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
        setLoading(false);
      });
  };

  return (
    <LoginContainer>
      <LoginBox>
        {/* Updated Profile Link with online SVG */}
        <ProfileLink href="/">
          <ProfileImage
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            onError={(e) => {
              e.target.src = "//ssl.gstatic.com/accounts/ui/avatar_2x.png"; // Fallback
            }}
          />
        </ProfileLink>
        <Title>Login</Title>
        {message && <ErrorMessage>{message}</ErrorMessage>}
        <form onSubmit={handleLogin}>
          <Input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" disabled={loading}>
            {loading && <Spinner />}
            {loading ? "Authenticating..." : "Login"}
          </Button>
        </form>
        <LinkText>
          Don't have an account? <a href="/register">Register</a>
        </LinkText>
      </LoginBox>
    </LoginContainer>
  );
};

export default Login;

