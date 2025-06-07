"use client";
import Link from "next/link";
import styles from "../styles/navbar.module.css";

export default function NavBar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <Link href="/products" className={styles.logo}>
          amazon
        </Link>
        <Link href="/">All</Link>
        <Link href="#">Today's Deals</Link>
        <Link href="#">Gift Cards</Link>
        <Link href="#">Registry & Gifting</Link>
      </div>
      <div className={styles.right}>
        <Link href="#">Search</Link>
        <Link href="/profile">Profile</Link>
        <Link href="#">Wishlist</Link>
        <Link href="/cart">Cart</Link>
      </div>
    </nav>
  );
}
