"use client";
import React from "react";
import { useAtom } from "jotai";
import { loginUserAtom } from "@/app/atoms";
import TalkRoomsList from "./TalkRoomsList";
import styles from "../home.module.scss";
import { useRouter } from "next/navigation";
import Image from "next/image";
const logoutButton = "../assets/logout_button.svg";

const Home = () => {
  const [loginUser] = useAtom(loginUserAtom);
  if (!loginUser) throw new Error("loginUser is undefined");
  const router = useRouter();

  const onClickLogout = () => {
    const logout = window.confirm("ログアウトしますか？");
    if (!logout) return;
    router.replace("/auth/signout");
  };
  const onClickAddConnection = () => {
    router.push("/addcontact");
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header_left}></div>
        <div className={styles.my_profile}>
          <div className={styles.icon}></div>
          <h2>{loginUser.nickname}</h2>
        </div>
        <div className={styles.header_buttons}>
          <button className={styles.add_connection_button} onClick={onClickAddConnection}>
            つ
          </button>
          <button onClick={onClickLogout} className={styles.logout_button}>
            <Image
              src={logoutButton}
              alt=""
              className={styles.logout_button_img}
              width={36}
              height={36}
            />
          </button>
        </div>
      </header>
      <TalkRoomsList loginUser={loginUser} />
    </>
  );
};

export default Home;
