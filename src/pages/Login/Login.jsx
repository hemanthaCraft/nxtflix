import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import loginApi from "../../api/auth";

import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const token = Cookies.get("jwt_token");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (token !== undefined) {
    return <Navigate to="/" replace />;
  }

  const submitForm = async event => {
    event.preventDefault();

    const response = await loginApi(email, password);

    if (response.success) {
      Cookies.set("jwt_token", response.data.token, {
        expires: 7,
        path: "/",
      });

      navigate("/", { replace: true });
    } else {
      setError(response.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="logo">NXTFLIX</h1>

        <form className="login-form" onSubmit={submitForm}>
          <label htmlFor="email">
            Email
          </label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            placeholder="Email"
            required
          />

          <label htmlFor="password">
            Password
          </label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            placeholder="Password"
            required
          />

          <button
            type="submit"
            className="login-btn"
          >
            Login
          </button>

          {error !== "" && (
            <p className="error-msg">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;