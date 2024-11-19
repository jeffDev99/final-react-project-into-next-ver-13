"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Image from "next/image";
import styles from "./Register.module.css";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRegister } from "@/services/auth";
import { useRouter } from "next/router";
import Auth from "@/Layout/Auth/Auth";
export default function Register() {
  const { mutate } = useRegister();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });
  return (
    <Auth>
      <div>
        <Image src="/images/form-logo.svg" width={500} height={500} alt="Picture of the author" className={styles.formLogo}></Image>
        <p className={styles.formTitle}>فرم ثبت نام</p>
        <form
          className={styles.form}
          onSubmit={handleSubmit(async (data) => {
            const { username, password } = data;
            mutate(
              { username, password },
              {
                onSuccess: (data) => {
                  toast.success("شما با موفقیت ثبت نام کردید. تا لحظاتی دیگر به صفحه ورود منتقل میشوید", { duration: 3000 });
                  setTimeout(() => {
                    router.push("/");
                  }, 3000);
                },
                onError: (err) => {
                  console.log(err);
                  toast.error("نام کاربری تکراری است. لطفا با نام کاربری دیگری ثبت نام کنید");
                  setValue("username", "");
                  setValue("password", "");
                  setValue("confirmPassword", "");
                },
              }
            );
          })}
        >
          <input type="text" {...register("username", { required: "نام کاربری الزامی است" })} id="username" placeholder="نام کاربری" />
          <p>{errors.username?.message}</p>
          <input type="password" {...register("password", { required: "رمز عبور الزامی است" })} id="password" placeholder="رمز عبور" />
          <p>{errors.password?.message}</p>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "تایید رمز عبور الزامی است",
              validate: (val) => {
                if (watch("password") != val) {
                  return "رمز وارد شده مطابقت ندارد";
                }
              },
            })}
            id="confirmPassword"
            placeholder="تایید رمز عبور"
          />
          <p>{errors.confirmPassword?.message}</p>
          <input type="submit" value="ثبت نام" />
          <Link href="/" className={styles.formRegister}>
            حساب کاربری دارید؟
          </Link>
        </form>
        <Toaster />
      </div>
    </Auth>
  );
}
