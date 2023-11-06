"use client";
import { loginUserAtom } from "@/app/atoms";
import supabase from "@/app/utils/supabase";
import { updateProfile } from "@/app/utils/supabaseFunctions";
import { useAtom } from "jotai";
import React from "react";
import styles from "./userSettings.module.scss";
import useProfileMutation from "./hooks/useProfileMutation";
import { useRouter } from "next/navigation";

const AvatarIconForm = ({ setShow }: { setShow: Function }) => {
  const [loginUser] = useAtom(loginUserAtom);
  const [file, setFile] = React.useState<File | null>(null);
  const [pathname, setPathname] = React.useState("");
  if (!loginUser) throw new Error("loginUser is undefined");
  const profileMutation = useProfileMutation(loginUser.id);
  const router = useRouter();

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.currentTarget.files;
    if (!loginUser || !f || f.length === 0) return;
    setFile(f[0]);
    setPathname(`${loginUser.id}/${f[0].name}`);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loginUser) return;
    console.log(file);
    if (!file) return;
    const { error: delerror } = await supabase.storage
      .from("avatar_image")
      .remove([loginUser.avatar_url]);
    const { data, error } = await supabase.storage
      .from("avatar_image")
      .upload(pathname, file, { cacheControl: "3600", upsert: true });
    if (error) throw new Error(error.message);
    console.log(data.path);
    const profileData = { avatar_url: data.path };
    profileMutation.mutate(profileData);
    window.alert("プロフィール画像を設定しました");
    setShow("none");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h3>プロフィール画像を設定</h3>
        <input type="file" onChange={changeInput} className={styles.file_input} />
        <button type="submit" className={styles.submit_button}>
          設定
        </button>
      </form>
    </>
  );
};

export default AvatarIconForm;
