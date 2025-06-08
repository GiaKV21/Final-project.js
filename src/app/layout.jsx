"use client";

import "./globals.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "../store/store";
import NavBar from "../components/NavBar";
import { cartActions } from "../store/cartSlice";
import { useEffect } from "react";

function SyncCart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // On first load → load from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    dispatch(cartActions.setCart(storedCart));
  }, [dispatch]);

  // On cartItems change → save to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return null;
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <NavBar />
          <SyncCart />
          {children}
        </Provider>
      </body>
    </html>
  );
}
