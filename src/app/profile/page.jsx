"use client";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("https://fakestoreapi.com/users/3");
      const data = await res.json();
      setUser(data);
    }
    fetchUser();
  }, []);

  if (!user) return <p style={{ padding: "2rem" }}>Loading profile...</p>;

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Profile</h1>
      <p>
        <strong>Name:</strong> {user.name.firstname} {user.name.lastname}
      </p>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone}
      </p>
      <p>
        <strong>Address:</strong> {user.address.number} {user.address.street},{" "}
        {user.address.city}, {user.address.zipcode}
      </p>
    </div>
  );
}
