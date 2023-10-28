"use client";
import React from "react";
import { useAtom } from "jotai";
import { loginUserAtom } from "@/app/atoms";
import TalkRoomsList from "./TalkRoomsList";
import styles from "../home.module.scss";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AvatarIcon from "@/app/components/AvatarIcon";
import SetAvatar from "../user_settings/SetAvatar";
const ADD_BUTTON = "../assets/add_button.svg";
const SETTINGS_BUTTON = "../assets/settings_button.svg";
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
      <SetAvatar />
      <header className={styles.header}>
        <div className={styles.header_buttons}>
          <button className={styles.add_connection_button} onClick={onClickAddConnection}>
            <Image
              src={ADD_BUTTON}
              alt=""
              className={styles.add_connection_button_img}
              width={36}
              height={36}
            />
          </button>
          <button onClick={onClickLogout} className={styles.settings_button}>
            <Image
              src={SETTINGS_BUTTON}
              alt=""
              className={styles.settings_button_img}
              width={36}
              height={36}
            />
          </button>
        </div>
        <div className={styles.my_profile}>
          <div className={styles.icon}>
            <AvatarIcon size={41} user={loginUser} />
          </div>
          <h2>{loginUser.nickname}</h2>
        </div>
      </header>
      <TalkRoomsList loginUser={loginUser} />
    </>
  );
};

export default Home;
