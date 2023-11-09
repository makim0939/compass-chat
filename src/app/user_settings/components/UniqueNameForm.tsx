import React, { useEffect } from "react";
import { Profile } from "@/app/types/database.types";
import styles from "../userSettings.module.scss";
import useProfileMutation from "../hooks/useProfileMutation";
import { updateProfile } from "@/app/utils/supabaseFunctions";

const UniqueNameForm = ({
  loginUser,
  setDisplay,
}: {
  loginUser: Profile;
  setDisplay: Function;
}) => {
  const profileMutation = useProfileMutation(loginUser.id);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (value === "") return;
    if (value[0] === "@") return;
    e.target.value = `@${value}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = e.currentTarget.uniqueName.value;
    if (value === "") return;
    const result = await updateProfile({
      id: loginUser.id,
      updateData: { unique_name: value },
    });
    profileMutation.mutate({ unique_name: value });
    window.alert("ユーザIDを設定しました");
    setDisplay("none");
  };
  useEffect(() => {
    document.getElementById("input")!.focus();
  }, []);
  return (
    <div className={styles.form_wrapper}>
      <p className={styles.close_button} onClick={() => setDisplay("none")}>
        閉じる
      </p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h3>ユーザIDを設定</h3>
        <input
          type="text"
          name="uniqueName"
          className={styles.text_input}
          id="input"
          placeholder="@user_id"
          defaultValue={loginUser.unique_name}
          onChange={handleChange}
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

export default UniqueNameForm;
