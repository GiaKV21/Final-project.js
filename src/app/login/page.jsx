"use client";

import styles from "../../styles/login.module.css";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  }, [router]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (result.token) {
        if (data.rememberMe) {
          localStorage.setItem("token", result.token);
        }
        alert("Login successful!");
        router.push("/");
      } else {
        alert("Login failed. Check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h1 className={styles.title}>Login</h1>

        <div className={styles.formGroup}>
          <label className={styles.label}>Username</label>
          <input {...register("username")} className={styles.input} />
          <p className={styles.error}>{errors.username?.message}</p>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Password</label>
          <input
            type="password"
            {...register("password")}
            className={styles.input}
          />
          <p className={styles.error}>{errors.password?.message}</p>
        </div>

        <div className={styles.checkboxGroup}>
          <input type="checkbox" {...register("rememberMe")} />
          <label>Remember me</label>
        </div>

        <div className={styles.registerLink}>
          <a href="/register">Don't have an account? Register here</a>
        </div>

        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
}
