"use client";
import React from "react";
import { useAtom } from "jotai";
import { loginUserAtom } from "@/app/atoms";
import TalkRoomsList from "./TalkRoomsList";
import styles from "../home.module.scss";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AvatarIcon from "@/app/components/AvatarIcon";
const ADD_BUTTON = "../assets/add_button.svg";
const SETTINGS_BUTTON = "../assets/settings_button.svg";
export const HOME_AVATAR_SIZE = 45;
const Home = () => {
  const [loginUser] = useAtom(loginUserAtom);
  if (!loginUser) throw new Error("loginUser is undefined");
  const router = useRouter();

  const onClickUserSettings = () => {
    router.push("/user_settings");
  };
  const onClickAddConnection = () => {
    router.push("/addcontact");
  };

  return (
    <>
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
          <button onClick={onClickUserSettings} className={styles.settings_button}>
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
            <AvatarIcon size={HOME_AVATAR_SIZE} user={loginUser} />
          </div>
          <h2>{loginUser.nickname}</h2>
        </div>
      </header>
      <TalkRoomsList loginUser={loginUser} />
    </>
  );
};

export default Home;
