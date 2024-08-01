"use client";
import Link from "next/link";
import styles from "./SideBar.module.css";
import Image from "next/image";
import { useUser } from "@/hooks/useUser";
import React from "react";
import { useInitializeLikedTracks } from "@/hooks/likes";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setAuthState, setUserData } from "@/store/features/userSlice";


export default function SideBar() {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((el) => el.auth.authState);
  const logout = () => {
    dispatch(setAuthState(false));
    dispatch(setUserData(null));
    localStorage.removeItem("user");
    localStorage.removeItem("token");
};
  const user = useAppSelector(state => state.auth.userData)
  useInitializeLikedTracks()

  
  return (
    <div className={styles.mainSidebar}>
      {authState && (<div className={styles.sidebarPersonal}>
        <p className={styles.sidebarPersonalName}>{user.email}</p>
        <div onClick={logout} className={styles.sidebarIcon}>
          <svg>
            <use xlinkHref="img/icon/sprite.svg#logout" />
          </svg>
        </div>
      </div>)}

      <div className={styles.sidebarBlock}>
        <div className={styles.sidebarList}>
          <div className={styles.sidebarItem}>
            <Link className={styles.sidebarLink} href="/tracks/category/1">
              <Image
                className={styles.sidebarImg}
                src="/img/playlist01.png"
                alt="day's playlist"
                width={250}
                height={150}
              />
            </Link>
          </div>
          <div className={styles.sidebarItem}>
            <Link className={styles.sidebarLink} href="/tracks/category/2">
              <Image
                className={styles.sidebarImg}
                src="/img/playlist02.png"
                alt="day's playlist"
                width={250}
                height={150}
              />
            </Link>
          </div>
          <div className={styles.sidebarItem}>
            <Link className={styles.sidebarLink} href="/tracks/category/3">
              <Image
                className={styles.sidebarImg}
                src="/img/playlist03.png"
                alt="day's playlist"
                width={250}
                height={150}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
