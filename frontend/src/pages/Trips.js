import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function Trips() {

  const [trips, setTrips] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    api.get(
      "/travel/destinations/"
    )
      .then((res) => {

        setTrips(res.data);

      })
      .catch((err) => {

        console.log(err);

      })
      .finally(() => {

        setLoading(false);

      });

  }, []);

  if (loading) {

    return (
      <div style={{ padding: 40 }}>
        Loading...
      </div>
    );

  }

  return (

    <div style={{ padding: 40 }}>

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >

        <h1>My Trips</h1>

        <Link
          to="/destination/create"
          style={{
            background:
              "#4f46e5",
            color: "white",
            padding:
              "10px 16px",
            borderRadius: "6px",
            textDecoration:
              "none",
          }}
        >
          + Create New Trip
        </Link>

      </div>

      {trips.length === 0 ? (

        <div>

          <h3>
            No trips available
          </h3>

          <p>
            Create your first trip
            to get started.
          </p>

        </div>

      ) : (

        trips.map((trip) => (

          <div
            key={trip.id}
            style={{
              padding: "20px",
              border:
                "1px solid #ddd",
              borderRadius:
                "8px",
              marginBottom:
                "15px",
            }}
          >

            <h3>
              {trip.name}
            </h3>

            <p>
              {trip.arrival_date}
              {" → "}
              {trip.departure_date}
            </p>

          </div>

        ))

      )}

    </div>

  );

}