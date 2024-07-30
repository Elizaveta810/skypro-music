"use client";
import Image from "next/image";
import styles from "../signup/page.module.css";
import classNames from "classnames";
import { useState } from "react";
import { signup } from "@/api/signup";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const { login }: any = useUser();
  const [signupData, setSignupData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    const cleanedValue = value.replace(/\s+/g, "");
    setSignupData({
      ...signupData,
      [name]: cleanedValue,
    });
  };

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (signupData.email === "") {
      alert("Введите email");
      return;
    }
    if (signupData.password === "") {
      alert("Введите пароль");
      return;
    }
    if (signupData.username === "") {
      alert("Введите Имя пользователя");
      return;
    }
    await signup({
      email: signupData.email,
      password: signupData.password,
      username: signupData.username,
    })
      .then((data) => {
        login(data);
        router.push("/signin");
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.containerSignup}>
        <div className={styles.modalBlock}>
          <form onSubmit={handleSignup} className={styles.modalFormLogin}>
            <a href="../">
              <div className={styles.modalLogo}>
                <Image
                  width={140}
                  height={21}
                  src="/img/logo_modal.png"
                  alt="Логотип"
                />
              </div>
            </a>
            <input
              onChange={handleInputChange}
              className={classNames(styles.modalInput, styles.login)}
              type="text"
              name="email"
              placeholder="Введите адрес электронной почты."
              value={signupData.email}
            />
            <input
              onChange={handleInputChange}
              className={classNames(styles.modalInput, styles.login)}
              type="text"
              name="username"
              placeholder="Введите имя пользователя."
              value={signupData.username}
            />
            <input
              onChange={handleInputChange}
              className={classNames(styles.modalInput, styles.passwordFirst)}
              type="password"
              name="password"
              placeholder="Пароль"
              value={signupData.password}
            />
            {/* <input
              onChange={handleInputChange}
              className={classNames(styles.modalInput, styles.passwordDouble)}
              type="password"
              name="repeatPassword"
              placeholder="Повторите пароль"
            /> */}
            <button type="submit" className={styles.modalBtnSignupEnt}>
              Зарегистрироваться
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
