"use client";
import React from "react";
import { useAtom } from "jotai";
import { loginUserAtom } from "@/app/atoms";
import TalkRoomsList from "./TalkRoomsList";
import styles from "../home.module.scss";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AvatarIcon from "@/app/components/AvatarIcon";
import SettingsIcon from "@/app/components/icon/SettingsIcon";
import AddIcon from "@/app/components/icon/AddIcon";

const ADD_BUTTON = "../assets/add_button.svg";
const SETTINGS_BUTTON = "../assets/settings_button.svg";
const ICON_SIZE = 36;
export const HOME_AVATAR_SIZE = 50;

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
          <AddIcon size={ICON_SIZE} />
          <SettingsIcon size={ICON_SIZE} />
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
