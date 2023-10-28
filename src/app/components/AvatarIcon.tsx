import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { loginUserAtom } from "../atoms";
import Image from "next/image";
import supabase from "../utils/supabase";
import styles from "./avatar.module.scss";
import { Profile } from "../types/types";

const AvatarIcon = ({ size, user }: { size: number; user: Profile }) => {
  const [avatarUrl, setAvatarUrl] = useState("");
  useEffect(() => {
    const getAvatarUrl = async () => {
      const {
        data: { publicUrl },
      } = supabase.storage.from("avatar_image").getPublicUrl(user.avatar_url);
      setAvatarUrl(publicUrl);
      console.log(publicUrl);
    };
    getAvatarUrl();
  }, [user]);

  return (
    <>
      {avatarUrl !== "" && (
        <button className={styles.button} style={{ width: size, height: size }}>
          <img
            alt=""
            src={avatarUrl}
            className={styles.image}
            style={{ width: size, height: size }}
          ></img>
        </button>
      )}
    </>
  );
};

export default AvatarIcon;
