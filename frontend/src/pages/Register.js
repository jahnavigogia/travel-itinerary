import { useState } from "react";
import api from "../api/axios";
import { useNavigate,Link } from "react-router-dom";

export default function Register() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] = useState("");

  const [loading, setLoading] =
    useState(false);

  const validatePassword = (password) => {

    // Minimum 8 chars
    if (password.length < 8) {

      return (
        "Password must be at least 8 " +
        "characters long"
      );
    }

    // Capital letter
    if (!/[A-Z]/.test(password)) {

      return (
        "Password must contain at " +
        "least one capital letter"
      );
    }

    // Number
    if (!/[0-9]/.test(password)) {

      return (
        "Password must contain at " +
        "least one number"
      );
    }

    return null;
  };

  const handleRegister = async (e) => {

    e.preventDefault();

    // Password validation
    const passwordError =
      validatePassword(password);

    if (passwordError) {

      alert(passwordError);

      return;
    }

    // Confirm password validation
    if (password !== confirmPassword) {

      alert("Passwords do not match");

      return;
    }

    try {

      setLoading(true);

      await api.post("/user/register/", {
        email,
        password,
      });

      alert(
        "Registration successful. " +
        "Please login."
      );

      navigate("/");

    } catch (err) {

      console.log(err);

      if (err.response?.data?.error) {

        alert(err.response.data.error);

      } else {

        alert("Registration failed");

      }

    } finally {

      setLoading(false);

    }

  };

  return (
    <div style={styles.container}>

      <form
        style={styles.card}
        onSubmit={handleRegister}
      >

        <h2>Register</h2>

        <input
          style={styles.input}
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
        />

        <p style={styles.passwordHint}>
          Password must contain:
          <br />
          • Minimum 8 characters
          <br />
          • One capital letter
          <br />
          • One number
        </p>

        <button
          style={{
            ...styles.button,
            opacity: loading ? 0.7 : 1,
          }}
          disabled={loading}
        >
          {
            loading
              ? "Registering..."
              : "Register"
          }
        </button>

        <Link
          to="/"
          style={styles.link}
        >
          Back to Login
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
    boxShadow:
      "0 10px 25px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: 15,
    width: 340,
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

  link: {
    textAlign: "center",
    textDecoration: "none",
    color: "#4f46e5",
  },

  passwordHint: {
    fontSize: 13,
    color: "#666",
    marginTop: -5,
  },
};