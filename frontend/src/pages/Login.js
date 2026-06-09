import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔐 Normal Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/user/token/", {
        email: email,
        password: password,
      });

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      navigate("/home");
    } catch (err) {
  console.log(err);

  // Backend custom error
  if (err.response?.data?.error) {
    alert(err.response.data.error);
  }

  // DRF / JWT detail error
  else if (err.response?.data?.detail) {
    alert(err.response.data.detail);
  }

  // Validation errors
  else if (err.response?.status === 400) {
    alert("Please enter valid details");
  }

  // Unauthorized
  else if (err.response?.status === 401) {
    alert("Invalid email or password");
  }

  // Server error
  else if (err.response?.status >= 500) {
    alert(
      "Server error. Please try again later."
    );
  }

  // Network error
  else if (err.request) {
    alert(
      "Network error. Please check your internet."
    );
  }

  // Unknown
  else {
    alert("Login failed");
  }
}
  };

  // 🌐 Google Login
  const handleGoogleLogin = () => {
    window.location.href =
      "http://127.0.0.1:8000/accounts/google/login/";
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleLogin}>
        <h2>Login</h2>

        <input
          style={styles.input}
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Normal Login */}
        <button style={styles.button}>Login</button>

        {/* Google Login */}
<button
  type="button"
  style={{ ...styles.button, background: "#db4437" }}
  onClick={handleGoogleLogin}
>
  Continue with Google
</button>

<Link
  to="/register"
  style={{
    textAlign: "center",
    textDecoration: "none",
    color: "#4f46e5",
    marginTop: 10,
  }}
>
  Don't have an account? Register
</Link>

      </form>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f3f4f6",
  },
  card: {
    padding: 40,
    borderRadius: 10,
    background: "white",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: 15,
    width: 320,
  },
  input: {
    padding: 10,
    borderRadius: 5,
    border: "1px solid #ccc",
  },
  button: {
    padding: 12,
    borderRadius: 5,
    border: "none",
    background: "#4f46e5",
    color: "white",
    cursor: "pointer",
  },
};