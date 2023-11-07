import React from "react";
import { Profile } from "@/app/types/database.types";
import styles from "../userSettings.module.scss";

const UniqueNameForm = ({
  loginUser,
  setDisplay,
}: {
  loginUser: Profile;
  setDisplay: Function;
}) => {
  const handleSubmit = () => {};
  return (
    <div className={styles.form_wrapper}>
      <p className={styles.close_button} onClick={() => setDisplay("none")}>
        閉じる
      </p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h3>ユーザIDを設定</h3>
        <input type="text" className={styles.text_input} placeholder="@user_id" />
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
