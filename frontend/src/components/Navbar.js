import {Link, useNavigate, useLocation}
from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
     window.location.href =
    "http://127.0.0.1:8000/accounts/logout/";
    navigate("/");
  };
    const location = useLocation();

    const hideNavbarRoutes = [
      "/",
      "user/register",
    ];

    if (
      hideNavbarRoutes.includes(
        location.pathname
      )
    ) {
      return null;
    }
  return (
    <nav style={styles.navbar}>
      <div style={styles.left}>
        <Link
          to="/home"
          style={styles.link}
        >
          Home
        </Link>

        <Link
          to="trips/"
          style={styles.link}
        >
          Trips
        </Link>

        <Link
          to="/profile"
          style={styles.link}
        >
          Profile
        </Link>
      </div>

      <button
        style={styles.logoutButton}
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
}

const styles = {
  navbar: {
    height: 70,
    background: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 40px",
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.08)",
  },

  left: {
    display: "flex",
    gap: 25,
  },

  link: {
    textDecoration: "none",
    color: "#4f46e5",
    fontWeight: 500,
  },

  logoutButton: {
    padding: "10px 18px",
    borderRadius: 6,
    border: "none",
    background: "#ef4444",
    color: "white",
    cursor: "pointer",
  },
};