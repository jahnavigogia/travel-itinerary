import { useEffect } from "react";
import axios from "../api/axios";

export default function GoogleSuccess() {

  useEffect(() => {

    const fetchJWT = async () => {
      try {
        const res = await axios.get("user/auth/google/jwt/", {
          withCredentials: true
        });

        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);

        window.location.href = "/dashboard";

      } catch (err) {
        console.error(err);
        alert("Google login failed");
      }
    };

    fetchJWT();

  }, []);

  return <h2>Logging you in...</h2>;
}