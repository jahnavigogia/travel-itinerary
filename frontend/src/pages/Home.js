import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function Home() {

  const [user, setUser] =
    useState(null);

  useEffect(() => {

    const access =
      localStorage.getItem(
        "access"
      );

    // Normal JWT login
    if (access) {

      api.get(
        "/user/current-user/"
      )
        .then((res) => {

          setUser(res.data);

        })
        .catch((err) => {

          console.log(
            "User fetch error:",
            err
          );

        });

    }

    // Google OAuth login
    else {

      api.get(
        "/user/auth/google/jwt/"
      )
        .then((res) => {

          localStorage.setItem(
            "access",
            res.data.access
          );

          localStorage.setItem(
            "refresh",
            res.data.refresh
          );

          return api.get(
            "/user/current-user/"
          );

        })
        .then((res) => {

          setUser(res.data);

        })
        .catch((err) => {

          console.log(
            "Google login error:",
            err
          );

        });

    }

  }, []);

  return (

    <div
      style={{
        padding: "40px",
      }}
    >

      <h1>
        Welcome to Travel Planner 🎉
      </h1>

      <div
        style={{
          marginTop: "30px",
          padding: "24px",
          background: "#f8fafc",
          borderRadius: "10px",
          border:
            "1px solid #e5e7eb",
        }}
      >

        <h2>
          Ready for your next
          adventure?
        </h2>

        <p>
          Plan destinations,
          activities, and
          itineraries all in one
          place.
        </p>

        <Link
          to="/destination/create"
          style={{
            display:
              "inline-block",
            marginTop: "12px",
            padding:
              "10px 16px",
            background:
              "#4f46e5",
            color: "white",
            textDecoration:
              "none",
            borderRadius:
              "6px",
          }}
        >
          Create Trip
        </Link>

      </div>

    </div>

  );

}