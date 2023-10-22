"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import styles from "./addcontact.module.scss";

type SearchUserFormInputs = {
  searchInput: string;
  mode: "nickname" | "email" | "unique_name";
};

const AddContact = () => {
  const [placeholder, setPlaceholder] = useState<string>("ニックネーム");
  const {
    register,
    resetField,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SearchUserFormInputs>();

  const watchMode = watch("mode");
  const watchSearchInput = watch("searchInput");

  const isValid = (data: SearchUserFormInputs) => {};
  const isInValid = (error: any) => {};

  useEffect(() => {
    const watchInputs = watch(
      (data, { name, type }) => {
        console.log("watchInputs");
        if (name === "mode") {
          if (data.mode === "unique_name") {
            setPlaceholder("ユーザID");
            resetField("searchInput", { defaultValue: "@" });
            return;
          }
          if (data.mode === "nickname") setPlaceholder("ニックネーム");
          if (data.mode === "email") setPlaceholder("example@email.com");
          resetField("searchInput");
          return;
        } else {
          if (data.mode !== "unique_name" || !data.searchInput) return;
          if (data.searchInput[0] !== "@") {
            setValue("searchInput", "@" + data.searchInput);
            return;
          }
        }
      },
      { mode: "nickname", searchInput: "" },
    );
    return () => {
      watchInputs.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(isValid, isInValid)} className={styles.search_form}>
        <div className={styles.index}>
          <Link href={"/"} className={styles.link}>
            <h2 className={styles.back_ward_button}>&lt;</h2>
          </Link>
          <h2 className={styles.title}>連絡先を追加</h2>
        </div>
        <div className={styles.input_wrapper}>
          <div className={styles.input_row}>
            <span>
              <label htmlFor="">ユーザを検索</label>
              <select {...register("mode")} name="mode" className={styles.input_select}>
                <option value="nickname">ニックネーム</option>
                <option value="email">メールアドレス</option>
                <option value="unique_name">ユーザID</option>
              </select>
            </span>
            <input
              {...register("searchInput", { required: true })}
              type="text"
              name="searchInput"
              placeholder={placeholder}
              className={styles.input_text}
            />
          </div>
        </div>
        <div className={styles.form_buttons}>
          <span></span>
          <span>
            <button className={styles.button}>検索</button>
          </span>
        </div>
      </form>
    </div>
  );
};

export default AddContact;
