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
    };
    getAvatarUrl();
  }, [user]);

  if (avatarUrl === "") return;
  return (
    <div className={styles.container} style={{ width: size, height: size }}>
      <Image
        alt=""
        src={avatarUrl}
        className={styles.image}
        style={{ width: size, height: size }}
        contentEditable
        width={size}
        height={size}
      ></Image>
    </div>
  );
};

export default AvatarIcon;
