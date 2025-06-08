"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("https://fakestoreapi.com/users/3");
      const data = await res.json();
      setUser(data);
    }
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out! You can now login with a different user.");
    router.push("/login");
  };

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
        minHeight: "calc(100vh - 10rem)",
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

      {/* Logout button */}
      <button
        onClick={handleLogout}
        style={{
          marginTop: "2rem",
          padding: "10px 16px",
          backgroundColor: "#ff4d4f",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Logout
      </button>
    </div>
  );
}
