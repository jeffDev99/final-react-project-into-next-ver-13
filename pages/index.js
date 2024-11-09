import { useRouter } from "next/router";
import Auth from "../Layout/Auth/Auth";
import Image from "next/image";
import { useLogin } from "@/services/auth";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Toaster ,toast } from "react-hot-toast";
import styles from "@/styles/Home.module.css"
import { setCookies } from "@/utils/config";

export default function Home() {
  const router = useRouter();
  const { mutate } = useLogin();
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
    },
  });
  return (
    <>
      <Auth>
        <div>
          <Image src="/images/form-logo.svg" width={500} height={500} alt="Picture of the author" className={styles.formLogo} ></Image>
          <p className={styles.formTitle}>فرم ورود</p>
          <form
            className={styles.form}
            onSubmit={handleSubmit(async (data) => {
              const { username, password } = data;
              mutate(
                { username, password },
                {
                  onSuccess: (data) => {
                    console.log(data);
                    setCookies(data.data.token);
                    toast.success("ورود شما با موفقیت انجام شد. تا لحظات دیگر به داشبورد منتقل میشوید", { duration: 3000 });
                    setTimeout(() => {
                      router.push("/dashboard")
                    }, 3000);
                  },
                  onError: (err) => {
                    console.log(err);
                    toast.error("نام کاربری یا رمز عبور اشتباه است");
                    setValue("username", "");
                    setValue("password", "");
                  },
                }
              );
            })}
          >
            <input type="text" {...register("username", { required: "نام کاربری الزامی است" })} id="username" placeholder="نام کاربری" />
            <p>{errors.username?.message}</p>
            <input type="password" {...register("password", { required: "رمز عبور الزامی است" })} id="password" placeholder="رمز عبور" />
            <p>{errors.password?.message}</p>
            <input type="submit" value="ورود" />
            <Link href="/register" className={styles.formRegister}>
              ایجاد حساب کاربری
            </Link>
          </form>
          <Toaster />
        </div>
      </Auth>
    </>
  );
}
