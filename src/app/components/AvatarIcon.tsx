"use client";
import React, { useEffect, useState } from "react";
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
        <div className={styles.container} style={{ width: size, height: size }}>
          <img
            alt=""
            src={avatarUrl}
            className={styles.image}
            style={{ width: size, height: size }}
          ></img>
        </div>
      )}
    </>
  );
};

export default AvatarIcon;
