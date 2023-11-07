import React from "react";
import styles from "../userSettings.module.scss";
import { Profile } from "@/app/types/database.types";

const NickNameForm = ({ loginUser, setDisplay }: { loginUser: Profile; setDisplay: Function }) => {
  const handleSubmit = () => {};
  return (
    <div className={styles.form_wrapper}>
      <p className={styles.close_button} onClick={() => setDisplay("none")}>
        閉じる
      </p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h3>ニックネームを設定</h3>
        <input type="text" className={styles.text_input} placeholder="ニックネーム" />
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
