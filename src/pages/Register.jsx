import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    setError("");

    if (!username || !email || !password) {
      setError("Please fill all fields.");
      return;
    }

    if (username.length < 3) {
      setError("Username must have at least 3 characters.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }

    if (password.length < 6) {
      setError("Password must have at least 6 characters.");
      return;
    }

    const user = {
      username,
      email,
      password,
    };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Registration successful!");

    navigate("/login");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">

        <h1>Register</h1>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            Register
          </button>

        </form>

        <p>
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;