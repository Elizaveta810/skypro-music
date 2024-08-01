"use client"; //Все хуки, мы используем только в клиентских комп-ах, поэтому в верху всей страницы, прописываем директиву 'use client'
import { useState } from "react";
import styles from "./Navigation.module.css";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setAuthState, setUserData } from "@/store/features/userSlice";

export default function Navigation() {
  const [isOpened, setIsOpened] = useState<boolean>(false); //Кода работаем с состоянием, то указываем тип данных (ситакс. <тип данных>)
  const authState = useAppSelector((el) => el.auth.authState);
  const dispatch =useAppDispatch();
  const logout = () => {
    dispatch(setAuthState(false));
    dispatch(setUserData(null));
    localStorage.removeItem("user");
    localStorage.removeItem("token");
};

  return (
    <nav className={styles.mainNav}>
      <div className={styles.navLogo}>
        <Link href="/">
          <Image
            className={styles.logoImage}
            src="/img/logo.png"
            alt="Логотип скайпро музыка"
            width={133}
            height={17}
          />
        </Link>
      </div>
      {/* {На кнопку навигации навешиваем обработчик событий.} */}
      <div
        onClick={() => setIsOpened((prev) => !prev)}
        className={styles.navBurger}
      >
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
      </div>
      {isOpened && (
        <div className={styles.navMenu}>
          <ul className={styles.menuList}>
            <li className={styles.menuItem}>
              <Link href="/" className={styles.menuLink}>
                Главное
              </Link>
            </li>
            <li className={styles.menuItem}>
              {authState ? (
                <Link href="/tracks/favorites" className={styles.menuLink}>
                  Мой плейлист
                </Link>
              ) : (
                <Link href="/signin" className={styles.menuLink}>
                  Мой плейлист
                </Link>
              )}
            </li>
            <li className={styles.menuItem}>
              {authState ? (
                <div onClick={logout} className={styles.menuLink}>
                  Выйти
                </div>
              ) : (
                <Link href="/signin" className={styles.menuLink}>
                  Войти
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
