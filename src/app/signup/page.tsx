"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "../signup/page.module.css";
import classNames from "classnames";
import { useState } from "react";
import { signup } from "@/api/signup";
import { useUser } from "@/hooks/useUser";

export default function SignupPage() {
  const { login }: any = useUser();
  const [signupData, setSignupData] = useState({
    email: "",
    username: "",
    password: "",
    
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  const handleSignup = async () => {
    await signup({
      email: signupData.email,
      password: signupData.password,
      username: signupData.username,
    })
      .then((data) => {
        login(data);
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.containerSignup}>
        <div className={styles.modalBlock}>
          <form className={styles.modalFormLogin}>
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
            <button onClick={handleSignup} className={styles.modalBtnSignupEnt}>
              <Link href="/">Зарегистрироваться</Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
