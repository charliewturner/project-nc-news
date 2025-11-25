import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_ROOT = "https://project-northcoders-news.onrender.com/api";

function Login({ setCurrentUser }) {
  const [users, setUsers] = useState([]);
  const [selectedUsername, setSelectedUsername] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_ROOT}/users`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load users");
        return res.json();
      })
      .then(({ users }) => {
        setUsers(users);
      })
      .catch(() => {
        setError("Failed to load users");
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedUsername) return;

    setCurrentUser(selectedUsername);
    localStorage.setItem("nc_news_user", selectedUsername);

    navigate("/"); // redirect after login
  };

  const handleClose = () => {
    navigate("/"); // or navigate(-1) if you prefer
  };

  return (
    <main className="login-page" style={{ position: "relative" }}>
      {/* X button */}
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
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="user-select">Choose a user</label>
        <select
          id="user-select"
          value={selectedUsername}
          onChange={(event) => setSelectedUsername(event.target.value)}
        >
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user.username} value={user.username}>
              {user.username}
            </option>
          ))}
        </select>

        <button type="submit" disabled={!selectedUsername}>
          Log in
        </button>
      </form>
    </main>
  );
}

export default Login;
