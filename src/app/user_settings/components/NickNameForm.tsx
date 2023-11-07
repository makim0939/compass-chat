import React from "react";
import styles from "../userSettings.module.scss";
import { Profile } from "@/app/types/database.types";
import { updateProfile } from "@/app/utils/supabaseFunctions";
import useProfileMutation from "../hooks/useProfileMutation";

const NickNameForm = ({ loginUser, setDisplay }: { loginUser: Profile; setDisplay: Function }) => {
  const profileMutation = useProfileMutation(loginUser.id);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = e.currentTarget.nickname.value;
    if (value === "") return;
    const result = await updateProfile({
      id: loginUser.id,
      updateData: { nickname: value },
    });
    profileMutation.mutate({ nickname: value });
    window.alert("ニックネームを設定しました");
    setDisplay("none");
  };
  return (
    <div className={styles.form_wrapper}>
      <p className={styles.close_button} onClick={() => setDisplay("none")}>
        閉じる
      </p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h3>ニックネームを設定</h3>
        <input
          name="nickname"
          type="text"
          className={styles.text_input}
          placeholder="ニックネーム"
        />
        <div className={styles.button_container}>
          <button type="submit" className={styles.submit_button}>
            設定
          </button>
        </div>
      </form>
    </div>
  );
};

export default NickNameForm;
