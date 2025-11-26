import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_ROOT = "https://project-northcoders-news.onrender.com/api";

function Login({ setCurrentUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    fetch(`${API_ROOT}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Invalid username or password");
        }
        return res.json();
      })
      .then(({ user }) => {
        setCurrentUser(user.username);
        localStorage.setItem("nc_news_user", user.username);
        navigate("/");
      })
      .catch(() => {
        setError("Invalid username or password");
      });
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <main className="login-page" style={{ position: "relative" }}>
      <button
        onClick={handleClose}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          border: "none",
          background: "transparent",
          fontSize: "1.5rem",
          cursor: "pointer",
        }}
      >
        ✕
      </button>

      <h2>Log in</h2>

      <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>
        Demo login credentials: <code>demo_account / demo123</code> .
      </p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label style={{ margin: "15px" }}>
          Username
          <input
            style={{ marginLeft: "7px" }}
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </label>

        <label>
          Password
          <input
            style={{ marginLeft: "7px" }}
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>

        <button
          style={{
            backgroundColor: "black",
            color: "white",
            padding: "6px 12px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            marginLeft: "10px",
          }}
          type="submit"
        >
          Log in
        </button>
      </form>
    </main>
  );
}

export default Login;
