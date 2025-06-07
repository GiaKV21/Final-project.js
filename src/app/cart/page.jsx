"use client";
import { useEffect, useState } from "react";
import styles from "../../styles/cart.module.css";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadCart() {
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];
      const fetches = localCart.map(async (item) => {
        const res = await fetch(`https://fakestoreapi.com/products/${item.id}`);
        const product = await res.json();
        return { id: item.id, quantity: item.quantity, product };
      });
      const result = await Promise.all(fetches);
      setCartItems(result);
      setIsLoading(false);
    }

    loadCart();
  }, []);

  function updateQuantity(id, amount) {
    const updated = cartItems.map((item) => {
      if (item.id === id) {
        const newQty = Math.min(10, Math.max(1, item.quantity + amount));
        return { ...item, quantity: newQty };
      }
      return item;
    });

    setCartItems(updated);
    localStorage.setItem(
      "cart",
      JSON.stringify(updated.map(({ id, quantity }) => ({ id, quantity })))
    );
  }

  function removeItem(id) {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem(
      "cart",
      JSON.stringify(updated.map(({ id, quantity }) => ({ id, quantity })))
    );
  }

  function handlePurchase() {
    alert("Thank you for your purchase!");
    setCartItems([]);
    localStorage.removeItem("cart");
  }

  if (isLoading) return <p className={styles.loading}>Loading cart...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Shopping Cart</h1>

      {cartItems.map(({ id, quantity, product }) => (
        <div key={id} className={styles.cartItem}>
          <img
            src={product.image}
            alt={product.title}
            className={styles.cartImage}
          />
          <div className={styles.cartInfo}>
            <h2 className={styles.cartTitle}>{product.title}</h2>
            <p className={styles.cartPrice}>${product.price.toFixed(2)}</p>
          </div>
          <div className={styles.cartControls}>
            <button
              onClick={() => updateQuantity(id, -1)}
              disabled={quantity <= 1}
            >
              −
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => updateQuantity(id, +1)}
              disabled={quantity >= 10}
            >
              +
            </button>
            <button
              onClick={() => removeItem(id)}
              className={styles.removeButton}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <hr className={styles.divider} />

      <div className={styles.summary}>
        <h2>
          Order Summary: $
          {cartItems
            .reduce(
              (total, item) => total + item.product.price * item.quantity,
              0
            )
            .toFixed(2)}
        </h2>
        <p>
          Total Items: {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        </p>
        <button onClick={handlePurchase} className={styles.buyButton}>
          Buy Now
        </button>
      </div>
    </div>
  );
}
