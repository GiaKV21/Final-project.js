"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../../store/cartSlice";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check login status
    const checkToken = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkToken();

    // Listen to storage changes (optional, good for multi-tab)
    window.addEventListener("storage", checkToken);

    return () => window.removeEventListener("storage", checkToken);
  }, []);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setLoading(false);
      }
    }
    if (id) {
      fetchProduct();
    }
  }, [id]);

  function addToCart(productId) {
    if (!isLoggedIn) {
      alert("You must be logged in to add products to your cart!");
      router.push("/login");
      return;
    }

    dispatch(cartActions.addItem(productId));
    alert("Product added to cart!");
  }

  if (loading || !product || typeof product.price !== "number") {
    return <p style={{ padding: "2rem" }}>Loading...</p>;
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "2rem",
        padding: "2rem",
        alignItems: "flex-start",
      }}
    >
      <img
        src={product.image}
        alt={product.title}
        style={{
          width: "300px",
          height: "300px",
          objectFit: "contain",
        }}
      />
      <div>
        <h1 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
          {product.title}
        </h1>
        <p style={{ marginBottom: "1rem" }}>{product.description}</p>
        <p
          style={{
            fontWeight: "bold",
            fontSize: "1.2rem",
            marginBottom: "1rem",
          }}
        >
          ${product.price.toFixed(2)}
        </p>
        <button
          onClick={() => addToCart(product.id)}
          style={{
            padding: "10px 16px",
            backgroundColor: "#007b8f",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
