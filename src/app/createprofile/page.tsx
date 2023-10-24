import React from "react";
import styles from "./createprofile.module.scss";
import Link from "next/link";

const CreateProfile = () => {
  return (
    <div>
      <form action="" className={styles.form}>
        <div className={styles.index}>
          <h2>ユーザ名を設定</h2>
        </div>
        <div className={styles.input_wrapper}>
          <div className={styles.input_row}>
            <label htmlFor="">ニックネーム</label>
            <input type="text" className={styles.input_text} />
          </div>
          <div className={styles.input_row}>
            <label htmlFor="">ユーザID</label>
            <input type="text" className={styles.input_text} />
          </div>
        </div>

        <div className={styles.form_buttons}>
          <div></div>
          <button className={styles.button}>登録</button>
        </div>
      </form>
    </div>
  );
};

export default CreateProfile;
