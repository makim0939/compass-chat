"use client";
import AvatarIcon from "@/app/components/AvatarIcon";
import React from "react";
import { loginUserAtom } from "../atoms";
import { useAtom } from "jotai";
import styles from "./userSettings.module.scss";
import { useRouter } from "next/navigation";
import AvatarIconForm from "./components/AvatarIconForm";
import NickNameForm from "./components/NickNameForm";
import UniqueNameForm from "./components/UniqueNameForm";

const UserSettings = () => {
  const [loginUser] = useAtom(loginUserAtom);
  const [display, setDisplay] = React.useState<"none" | "avatar_icon" | "nickname" | "unique_name">(
    "none",
  );
  if (!loginUser) throw new Error("loginUser is undefined");
  const router = useRouter();

  const onClickLogout = () => {
    const logout = window.confirm("ログアウトしますか？");
    if (!logout) return;
    router.replace("/auth/signout");
  };

  if (display === "avatar_icon")
    return (
      <div className={styles.wrapper}>
        <AvatarIconForm loginUser={loginUser} setDisplay={setDisplay} />
      </div>
    );
  if (display === "nickname")
    return (
      <div className={styles.wrapper}>
        <NickNameForm loginUser={loginUser} setDisplay={setDisplay} />
      </div>
    );
  if (display === "unique_name")
    return (
      <div className={styles.wrapper}>
        <UniqueNameForm loginUser={loginUser} setDisplay={setDisplay} />
      </div>
    );
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <p className={styles.close_button} onClick={() => router.push("/")}>
          ホームに戻る
        </p>
        <ul className={styles.settings_list}>
          <li className={styles.settings_head}>
            <button style={{ width: 47, height: 47 }} onClick={() => setDisplay("avatar_icon")}>
              <AvatarIcon size={47} user={loginUser} />
            </button>
          </li>
          <li className={styles.settings_item}>
            <button type="button" onClick={() => setDisplay("nickname")}>
              <div className={styles.nickname}>ニックネーム: {loginUser.nickname}</div>
            </button>
          </li>
          <li className={styles.settings_item}>
            <button type="button" onClick={() => setDisplay("unique_name")}>
              <div className={styles.unique_name}>
                {!loginUser.unique_name ? <>IDを設定する</> : <>ID: {loginUser.unique_name}</>}
              </div>
            </button>
          </li>
          <li className={styles.separator}></li>
          <li className={styles.settings_item}>
            <button type="button" onClick={onClickLogout}>
              <div className={styles.logout}>ログアウト</div>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserSettings;
