import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Profile() {

  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    phone_no: "",
    age: "",
    country: "",
    state: "",
    city: "",
    gender: "",
  });

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [profileCompleted,
    setProfileCompleted] =
    useState(false);

  const [successMessage,
      setSuccessMessage] =
      useState("");
  // Fetch current user
  useEffect(() => {

    api.get("/user/current-user/")
      .then((res) => {

        setFormData({
          username:
            res.data.username || "",

          first_name:
            res.data.first_name || "",

          last_name:
            res.data.last_name || "",

          phone_no:
            res.data.phone_no || "",

          age:
            res.data.age || "",

          country:
            res.data.country || "",

          state:
            res.data.state || "",

          city:
            res.data.city || "",

          gender:
            res.data.gender || "",
        });

        setProfileCompleted(
          res.data.is_profile_completed
        );

      })
      .catch((err) => {

  console.log(
    "Profile fetch error:",
    err.response?.status,
    err.response?.data
  );

})
      .finally(() => {

        setLoading(false);

      });

  }, []);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setSaving(true);

      const res = await api.put(
        "/user/complete-profile/",
        formData
      );

      setSuccessMessage(
  "🎉 Profile completed successfully!"
);
{successMessage && (
  <p style={{
    color: "green",
    marginBottom: "15px",
  }}>
    {successMessage}
  </p>
)}
      setProfileCompleted(true);
      setTimeout(() => {
  window.location.href = "/trips";
}, 1500);

     } catch (err) {
  console.log(err);
  if (err.response?.data) {
    const errors = err.response.data;
    const firstKey =
      Object.keys(errors)[0];
    const firstError =
      errors[firstKey];

    // If serializer returns array
    if (Array.isArray(firstError)) {
      alert(firstError[0]);
    }

    // If string
    else if (
      typeof firstError === "string"
    ) {
      alert(firstError);
    }

    // Fallback
    else {
      alert("Profile update failed");
    }
  } else {
    alert(
      "Failed to update profile"
    );
  }

} finally {
      setSaving(false);

    }

  };

  if (loading) {

    return (
      <p style={{ padding: 40 }}>
        Loading...
      </p>
    );

  }

  return (
    <div style={styles.container}>

      <div style={styles.card}>

        <h2>Profile</h2>

        {
          profileCompleted ? (
            <p style={styles.success}>
              ✅ Profile completed
            </p>
          ) : (
            <p style={styles.warning}>
              ⚠ Complete your profile
              before creating your
              first destination
            </p>
          )
        }

        <form onSubmit={handleSubmit}>

          <input
            style={styles.input}
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />

          <input
            style={styles.input}
            name="first_name"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
          />

          <input
            style={styles.input}
            name="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
          />

          <input
            style={styles.input}
            name="phone_no"
            placeholder="Phone Number"
            value={formData.phone_no}
            onChange={handleChange}
          />

          <input
            style={styles.input}
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
          />

          <input
            style={styles.input}
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
          />

          <input
            style={styles.input}
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
          />

          <input
            style={styles.input}
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
          />

          <input
            style={styles.input}
            name="gender"
            placeholder="Gender"
            value={formData.gender}
            onChange={handleChange}
          />

          <button
            style={styles.button}
            disabled={saving}
          >
            {
              saving
                ? "Saving..."
                : "Save Profile"
            }
          </button>

        </form>

      </div>

    </div>
  );
}

const styles = {

  container: {
    display: "flex",
    justifyContent: "center",
    padding: 40,
    background: "#f3f4f6",
    minHeight: "100vh",
  },

  card: {
    width: 400,
    background: "white",
    padding: 30,
    borderRadius: 10,
    boxShadow:
      "0 10px 25px rgba(0,0,0,0.08)",
  },

  input: {
    width: "100%",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    border: "1px solid #ccc",
  },

  button: {
    width: "100%",
    padding: 12,
    border: "none",
    borderRadius: 5,
    background: "#4f46e5",
    color: "white",
    cursor: "pointer",
  },

  success: {
    color: "green",
    marginBottom: 20,
  },

  warning: {
    color: "#d97706",
    marginBottom: 20,
  },
};