function Header({ currentUser, setCurrentUser }) {
  return (
    <header>
      <h3 className="sitename">NC-News</h3>
      <h3 className="username">
        Current user:
        <i> {currentUser}</i>
      </h3>
    </header>
  );
}

export default Header;
