"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import styles from "../../styles/register.module.css";

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required").min(4).max(20),
  lastName: yup.string().required("Last name is required").min(4).max(20),
  age: yup.number().required("Age is required").min(13).max(120),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Min 6 characters")
    .max(12, "Max 12 characters")
    .matches(/[A-Z]/, "At least one uppercase letter")
    .matches(/[a-z]/, "At least one lowercase letter")
    .matches(/\d/, "At least one number"),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^\d+$/, "Only digits allowed")
    .min(10, "Min 10 digits")
    .max(100, "Too long"),
});

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        data
      );
      alert("Registration successful!");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label className={styles.label}>First Name</label>
        <input className={styles.input} {...register("firstName")} />
        <p className={styles.error}>{errors.firstName?.message}</p>

        <label className={styles.label}>Last Name</label>
        <input className={styles.input} {...register("lastName")} />
        <p className={styles.error}>{errors.lastName?.message}</p>

        <label className={styles.label}>Age</label>
        <input className={styles.input} type="number" {...register("age")} />
        <p className={styles.error}>{errors.age?.message}</p>

        <label className={styles.label}>Email</label>
        <input className={styles.input} type="email" {...register("email")} />
        <p className={styles.error}>{errors.email?.message}</p>

        <label className={styles.label}>Password</label>
        <input
          className={styles.input}
          type="password"
          {...register("password")}
        />
        <p className={styles.error}>{errors.password?.message}</p>

        <label className={styles.label}>Phone</label>
        <input className={styles.input} {...register("phone")} />
        <p className={styles.error}>{errors.phone?.message}</p>

        <button className={styles.button} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
