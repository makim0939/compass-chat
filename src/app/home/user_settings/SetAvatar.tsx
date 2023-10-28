import { loginUserAtom } from "@/app/atoms";
import supabase from "@/app/utils/supabase";
import { updateProfile } from "@/app/utils/supabaseFunctions";
import { useAtom } from "jotai";
import React from "react";
import { set } from "react-hook-form";

const SetAvatar = () => {
  const [loginUser] = useAtom(loginUserAtom);
  const [file, setFile] = React.useState<File | null>(null);
  const [pathname, setPathname] = React.useState("");
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
    updateProfile({ id: loginUser.id, updateData: profileData });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={changeInput} />
        <button type="submit">sousin</button>
      </form>
    </div>
  );
};

export default SetAvatar;
