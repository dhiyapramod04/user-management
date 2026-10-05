import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "https://api.slingacademy.com/v1/sample-data/users"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();

        setUsers(data.users);
      } catch (error) {
        setError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");

    navigate("/login");
  };

  const filteredUsers = users.filter((user) => {
    const text = search.toLowerCase();

    return (
      user.first_name.toLowerCase().includes(text) ||
      user.last_name.toLowerCase().includes(text) ||
      user.email.toLowerCase().includes(text)
    );
  });

  return (
    <div className="dashboard">

      <nav className="navbar">
        <h2>User Management</h2>

        <button onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <div className="dashboard-content">

        <div className="top-section">
          <div>
            <h1>Dashboard</h1>
            <p>All Users</p>
          </div>

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading && (
          <h2 className="center">
            Loading users...
          </h2>
        )}

        {error && (
          <h2 className="error center">
            {error}
          </h2>
        )}

        {!loading && !error && (
          <div className="user-grid">

            {filteredUsers.map((user) => (
              <div
                className="user-card"
                key={user.id}
              >

                <img
                  src={user.profile_picture}
                  alt={user.first_name}
                />

                <h3>
                  {user.first_name}{" "}
                  {user.last_name}
                </h3>

                <p>{user.email}</p>

                <p>
                  ID: {user.id}
                </p>

                <Link
                  to={`/user/${user.id}`}
                  className="details-button"
                >
                  View Details
                </Link>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default Dashboard;