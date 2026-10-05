import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function User() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://api.slingacademy.com/v1/sample-data/users/${id}`
        );

        if (!response.ok) {
          throw new Error("User not found");
        }

        const data = await response.json();

        setUser(data.user);
      } catch (error) {
        setError("Failed to load user details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  return (
    <div className="details-page">

      <button
        className="back-button"
        onClick={() => navigate("/dashboard")}
      >
        ← Back
      </button>

      {loading && (
        <h2 className="center">
          Loading user...
        </h2>
      )}

      {error && (
        <h2 className="error center">
          {error}
        </h2>
      )}

      {!loading && !error && user && (
        <div className="details-card">

          <img
            src={user.profile_picture}
            alt={user.first_name}
          />

          <h1>
            {user.first_name}{" "}
            {user.last_name}
          </h1>

          <p>
            <strong>ID:</strong> {user.id}
          </p>

          <p>
            <strong>Email:</strong> {user.email}
          </p>

          <p>
            <strong>Phone:</strong> {user.phone}
          </p>

          <p>
            <strong>Gender:</strong> {user.gender}
          </p>

          <p>
            <strong>Job:</strong> {user.job}
          </p>

          <p>
            <strong>City:</strong> {user.city}
          </p>

          <p>
            <strong>Country:</strong> {user.country}
          </p>

        </div>
      )}

    </div>
  );
}

export default User;