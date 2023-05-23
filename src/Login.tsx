import { Button } from "@tremor/react";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { login } from "./services";

const Login = () => {
  const [location, setLocation] = useLocation();
  useEffect(() => {
    const token = window.localStorage.getItem("Token");
    console.log(token);
    if (token) {
      setLocation("/jokes");
    }
  }, []);

  return (
    <div>
      <h1>Login</h1>
      <Button onClick={() => login()}>Login</Button>
    </div>
  );
};

export default Login;
