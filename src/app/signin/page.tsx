"use client";

import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { postAuthUser} from "@/api/signin";
import { setAuthState, setUserData } from "@/store/features/userSlice";
import { fetchToken } from "@/api/user";

type SigninType = {
    email: string;
    password: string;
};

export default function SignIn() {
    const dispatch = useAppDispatch();
    const [loginData, setLoginData] = useState<SigninType>({
        email: "",
        password: "",
    });

    const router = useRouter();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setLoginData({
            ...loginData,
            [name]: value,
        });
    };

    const handleSignin = async () => {
        await postAuthUser(loginData)
            .then((data) => {
                dispatch(setAuthState(true));
                dispatch(
                    setUserData({
                        username: data.username,
                        email: data.email,
                        id: data.id,
                    })
                );

                localStorage.setItem("user", JSON.stringify(data));
                fetchToken(loginData).then((data) => {
                    console.log(data)
                    localStorage.setItem("token", JSON.stringify(data.access));
                    dispatch(
                        setUserData({
                            refresh: data.refresh,
                            access: data.access,
                        })
                    );
                    router.push("/tracks");
                });
            })
            .catch((error) => {
                alert(error);
            });
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.containerEnter}>
                <div className={styles.modalBlock}>
                    <form className={styles.modalFormLogin} action="#">
                        <Link href="/tracks">
                            <div className={styles.modalLogo}>
                                <Image
                                    src="/img/logo_modal.png"
                                    alt="логотип"
                                    width={250}
                                    height={170}
                                />
                            </div>
                        </Link>
                        <input
                            onChange={handleInputChange}
                            className={classNames(
                                styles.modalInput,
                                styles.login
                            )}
                            type="email"
                            name="email"
                            placeholder="Почта"
                        />
                        <input
                            onChange={handleInputChange}
                            className={classNames(
                                styles.modalInput,
                                styles.password
                            )}
                            type="password"
                            name="password"
                            placeholder="Пароль"
                        />
                        <button
                            className={styles.modalBtnEnter}
                            onClick={handleSignin}
                        >
                            <p>Войти</p>
                        </button>

                        <button className={styles.modalBtnSignUp}>
                            <Link
                                className={styles.modalBtnText}
                                href="/signup"
                            >
                                Зарегистрироваться
                            </Link>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
