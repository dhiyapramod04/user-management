import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please enter username and password");
      return;
    }

    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      setError("Please register first");
      return;
    }

    const user = JSON.parse(savedUser);

    if (
      username === user.username &&
      password === user.password
    ) {
      // Login status save
      localStorage.setItem("isLoggedIn", "true");

      // Go to dashboard
      navigate("/dashboard");
    } else {
      setError("Wrong username or password");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">

        <h1>Login</h1>

        <form onSubmit={handleLogin}>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="error">{error}</p>
          )}

          <button type="submit">
            Login
          </button>

        </form>

        <p>
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;