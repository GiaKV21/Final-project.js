"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = cart.findIndex((item) => item.id === productId);
    if (existingItemIndex !== -1) {
      if (cart[existingItemIndex].quantity < 10) {
        cart[existingItemIndex].quantity += 1;
      }
    } else {
      cart.push({ id: productId, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
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
