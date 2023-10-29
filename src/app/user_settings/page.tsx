"use client";
import AvatarIcon from "@/app/components/AvatarIcon";
import { Profile } from "@/app/types/types";
import React from "react";
import { loginUserAtom } from "../atoms";
import { useAtom } from "jotai";
import styles from "./userSettings.module.scss";
import { useRouter } from "next/navigation";
import AvatarIconForm from "./AvatarIconForm";
import { set } from "react-hook-form";

const UserSettings = () => {
  const [loginUser] = useAtom(loginUserAtom);
  const [show, setShow] = React.useState<"none" | "avatar_icon" | "nickname" | "unique_name">(
    "none",
  );
  if (!loginUser) throw new Error("loginUser is undefined");
  const router = useRouter();

  const onClickBackHome = () => {
    router.push("/");
  };

  const onClickAvatarIcon = () => {
    setShow("avatar_icon");
  };
  const onClickNickname = () => {};
  const onClickUniqueName = () => {};
  const onClickLogout = () => {
    const logout = window.confirm("ログアウトしますか？");
    if (!logout) return;
    router.replace("/auth/signout");
  };
  const onClickCloseForm = () => {
    setShow("none");
  };
  return (
    <>
      <div className={styles.wrapper}>
        {show === "none" && (
          <div className={styles.container}>
            <p className={styles.back_home} onClick={onClickBackHome}>
              ホームに戻る
            </p>
            <ul className={styles.settings_list}>
              <li className={styles.settings_head}>
                <button style={{ width: 47, height: 47 }} onClick={onClickAvatarIcon}>
                  <AvatarIcon size={47} user={loginUser} />
                </button>
              </li>
              <li className={styles.settings_item}>
                <button type="button" onClick={onClickNickname}>
                  <div className={styles.nickname}>ニックネーム: {loginUser.nickname}</div>
                </button>
              </li>
              <li className={styles.settings_item}>
                <button type="button" onClick={onClickUniqueName}>
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
        )}
        {show === "avatar_icon" && (
          <div className={styles.form_wrapper}>
            <div onClick={onClickCloseForm}>閉じる</div>
            <AvatarIconForm />
          </div>
        )}
      </div>
    </>
  );
};

export default UserSettings;
