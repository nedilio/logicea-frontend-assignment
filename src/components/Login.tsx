import { Button } from "@tremor/react";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { login } from "../services";

const Login = () => {
  const [, setLocation] = useLocation();
  useEffect(() => {
    const token = window.localStorage.getItem("Token");
    console.log(token);
    if (token) {
      setLocation("/jokes");
    }
  });

  const handleLogin = () => {
    login();
    if (window.localStorage.getItem("Token")) {
      setLocation("/jokes");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
};

export default Login;
