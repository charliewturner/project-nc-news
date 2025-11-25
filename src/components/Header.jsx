import { Link } from "react-router-dom";

function Header({ currentUser, setCurrentUser }) {
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("nc_news_user");
  };

  return (
    <header className="header">
      <h3 className="sitename">NC-News</h3>

      <div className="user-section">
        {currentUser ? (
          <>
            <h3 className="username">
              Current user: <i>{currentUser}</i>
            </h3>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <h3 className="username">Not logged in</h3>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
