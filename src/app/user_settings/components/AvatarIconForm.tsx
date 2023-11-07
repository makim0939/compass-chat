"use client";
import React from "react";
import supabase from "@/app/utils/supabase";
import useProfileMutation from "../hooks/useProfileMutation";
import { Profile } from "../../types/types";
import styles from "../userSettings.module.scss";

const AvatarIconForm = ({
  loginUser,
  setDisplay,
}: {
  loginUser: Profile;
  setDisplay: Function;
}) => {
  const [file, setFile] = React.useState<File | null>(null);
  const [pathname, setPathname] = React.useState("");
  const profileMutation = useProfileMutation(loginUser.id);

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.currentTarget.files;
    if (!f || f.length === 0) return;
    setFile(f[0]);
    setPathname(`${loginUser.id}/${f[0].name}`);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    const { error: deleteError } = await supabase.storage
      .from("avatar_image")
      .remove([loginUser.avatar_url]);
    const { data, error } = await supabase.storage
      .from("avatar_image")
      .upload(pathname, file, { cacheControl: "3600", upsert: true });
    if (error) throw new Error(error.message);
    profileMutation.mutate({ avatar_url: data.path });
    window.alert("プロフィール画像を設定しました");
    setDisplay("none");
  };

  return (
    <div className={styles.form_wrapper}>
      <p className={styles.close_button} onClick={() => setDisplay("none")}>
        閉じる
      </p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h3>プロフィール画像を設定</h3>
        <input type="file" onChange={changeInput} className={styles.file_input} />
        <div className={styles.button_container}>
          <button type="submit" className={styles.submit_button}>
            設定
          </button>
        </div>
      </form>
    </div>
  );
};

export default AvatarIconForm;
