"use client";
import React from "react";
import { useAtom } from "jotai";
import { loginUserAtom } from "@/app/atoms";
import TalkRoomsList from "./TalkRoomsList";
import styles from "../home.module.scss";
import { useRouter } from "next/navigation";
import AvatarIcon from "@/app/components/AvatarIcon";
import SettingsIcon from "@/app/components/icon/SettingsIcon";
import AddIcon from "@/app/components/icon/AddIcon";
import { ICON_SIZE } from "@/app/ui.config";
export const HOME_AVATAR_SIZE = 50;

const Home = () => {
  const [loginUser] = useAtom(loginUserAtom);
  if (!loginUser) throw new Error("loginUser is undefined");
  const router = useRouter();

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header_buttons}>
          <AddIcon size={ICON_SIZE} margin="0 8px" onClick={() => router.push("/addcontact")} />
          <SettingsIcon
            size={ICON_SIZE}
            margin="0 8px"
            onClick={() => router.push("/user_settings")}
          />
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
