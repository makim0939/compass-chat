import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { loginUserAtom } from "../atoms";
import Image from "next/image";
import supabase from "../utils/supabase";
import styles from "./avatar.module.scss";

const Avatar = ({ size }: { size: number }) => {
  const [loginUser] = useAtom(loginUserAtom);
  const [avatarUrl, setAvatarUrl] = useState("");
  useEffect(() => {
    const getAvatarUrl = async () => {
      if (!loginUser) return;
      const {
        data: { publicUrl },
      } = supabase.storage.from("avatar_image").getPublicUrl(loginUser.avatar_url);
      setAvatarUrl(publicUrl);
      console.log(publicUrl);
    };
    getAvatarUrl();
  }, []);

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

export default Avatar;
