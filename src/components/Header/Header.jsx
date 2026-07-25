import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useContext } from "react";

import { WatchLaterContext } from "../../context/WatchLaterContext";

import "./Header.css";

function Header() {
  const { watchLater } = useContext(WatchLaterContext);

  const logout = () => {
    Cookies.remove("jwt_token", { path: "/" });
    window.location.replace("/login");
  };

  return (
    <nav className="header">
      <Link to="/" className="logo link">
        NXTFLIX
      </Link>

      <div className="nav-links">
        <Link to="/" className="link">
          Home
        </Link>

        <Link to="/watch-later" className="link watch-later-link">
          Watch Later

          {watchLater.length > 0 && (
            <span className="watch-badge">
              {watchLater.length}
            </span>
          )}
        </Link>

        <button
          type="button"
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Header;