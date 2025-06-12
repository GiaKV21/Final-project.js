"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import styles from "../../styles/cart.module.css";

export default function CartPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [products, setProducts] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      const fetches = cartItems.map(async (item) => {
        const res = await fetch(`https://fakestoreapi.com/products/${item.id}`);
        const product = await res.json();
        return { id: item.id, product };
      });
      const result = await Promise.all(fetches);

      const productsMap = {};
      result.forEach(({ id, product }) => {
        productsMap[id] = product;
      });

      setProducts(productsMap);
      setIsLoading(false);
    }

    if (cartItems.length > 0) {
      loadProducts();
    } else {
      setProducts({});
      setIsLoading(false);
    }
  }, [cartItems]);

  const updateQuantity = (id, amount) => {
    dispatch(cartActions.updateQuantity({ id, amount }));
  };

  const removeItem = (id) => {
    dispatch(cartActions.removeItem(id));
  };

  const handlePurchase = () => {
    alert("Thank you for your purchase!");
    dispatch(cartActions.clearCart());
  };

  if (isLoading) return <p className={styles.loading}>Loading cart...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Shopping Cart</h1>

      {cartItems.length === 0 && (
        <p style={{ padding: "1rem" }}>Your cart is empty.</p>
      )}

      {cartItems.map(({ id, quantity }) => {
        const product = products[id];
        if (!product) return null; 

        return (
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
        );
      })}

      <hr className={styles.divider} />

      <div className={styles.summary}>
        <h2>
          Order Summary: $
          {cartItems
            .reduce((total, item) => {
              const product = products[item.id];
              if (!product) return total;
              return total + product.price * item.quantity;
            }, 0)
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
