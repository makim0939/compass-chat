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
import CloseIcon from "../components/ui/icon/CloseIcon";
import BackwardIcon from "../components/ui/icon/BackwardIcon";
import { ICON_SIZE_SMALL, ICON_COLOR_DARK } from "@/app/ui.config";
const AVATAR_ICON_SIZE = 60;

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
        <div className={styles.header}>
          <BackwardIcon
            size={ICON_SIZE_SMALL}
            fill={ICON_COLOR_DARK}
            margin="0 16px 0 0"
            onClick={() => router.push("/")}
          />
          <h3>設定</h3>
          <div style={{ width: ICON_SIZE_SMALL, margin: "0 8px" }}></div>
          {/* <CloseIcon
            size={ICON_SIZE_SMALL}
            margin="0 8px"
            fill={ICON_COLOR_DARK}
            onClick={() => router.push("/")}
          /> */}
        </div>

        <ul className={styles.settings_list}>
          <li className={styles.settings_head}>
            <button
              style={{ width: AVATAR_ICON_SIZE, height: AVATAR_ICON_SIZE }}
              onClick={() => setDisplay("avatar_icon")}
            >
              <AvatarIcon size={AVATAR_ICON_SIZE} user={loginUser} />
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
