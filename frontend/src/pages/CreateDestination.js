import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function CreateDestination() {
  const navigate = useNavigate();

  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    arrival_date: "",
    departure_date: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (departureDate < arrivalDate) {
      setError(
        "Departure date must be after the arrival date."
      );
      return;
    }

    try {
      setLoading(true);

      await api.post(
        "/travel/destinations/create/",
        formData
      );

      navigate("/trips");
    } catch (err) {
      console.log(err);

      setError(
        err.response?.data?.non_field_errors?.[0] ||
        err.response?.data?.detail ||
        "Failed to create trip."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Create Trip</h2>

        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="text"
            name="name"
            placeholder="Destination Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Arrival Date</label>

          <input
            style={styles.input}
            type="date"
            value={arrivalDate}
            onChange={(e) => {
              const value = e.target.value;

              setArrivalDate(value);

              setFormData((prev) => ({
                ...prev,
                arrival_date: value,
              }));

              if (
                departureDate &&
                departureDate < value
              ) {
                setDepartureDate("");

                setFormData((prev) => ({
                  ...prev,
                  departure_date: "",
                }));
              }
            }}
            required
          />

          <label>Departure Date</label>

          <input
            style={styles.input}
            type="date"
            value={departureDate}
            min={arrivalDate}
            onChange={(e) => {
              const value = e.target.value;

              setDepartureDate(value);

              setFormData((prev) => ({
                ...prev,
                departure_date: value,
              }));
            }}
            required
          />

          <button
            style={styles.button}
            disabled={loading}
          >
            {loading
              ? "Creating..."
              : "Create Trip"}
          </button>
        </form>
      </div>

      {error && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h3 style={{ color: "#dc3545" }}>
              Error
            </h3>

            <p>{error}</p>

            <button
              style={styles.modalButton}
              onClick={() => setError("")}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    padding: "40px",
  },

  card: {
    width: "500px",
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow:
      "0 4px 12px rgba(0,0,0,0.1)",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "6px",
    background: "#4f46e5",
    color: "#fff",
    cursor: "pointer",
    fontSize: "16px",
  },

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },

  modal: {
    background: "#fff",
    padding: "24px",
    borderRadius: "12px",
    minWidth: "350px",
    textAlign: "center",
    boxShadow:
      "0 4px 12px rgba(0,0,0,0.2)",
  },

  modalButton: {
    marginTop: "15px",
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    background: "#4f46e5",
    color: "#fff",
    cursor: "pointer",
  },
};