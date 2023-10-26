"use client";
import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { loginUserAtom } from "../atoms";
import { Profile } from "../types/database.types";
import styles from "./addcontact.module.scss";
import useContact from "./hooks/useContact";
import SearchResult from "./components/SearchResult";
import { selectProfilesByNickname } from "../utils/supabaseFunctions";

type SearchUserFormInputs = {
  searchInput: string;
  mode: "nickname" | "email" | "unique_name";
};

const AddContact = () => {
  const [loginUser] = useAtom(loginUserAtom);
  const { data: contacts, isLoading: isContactsLoading } = useContact(loginUser?.id);
  if (!loginUser) throw new Error("loginUser is undefined");
  const [searchResults, setSearchResults] = useState<Profile[] | null>(null);
  const [placeholder, setPlaceholder] = useState<string>("ニックネーム");

  const {
    register,
    resetField,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SearchUserFormInputs>();

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

  const checkIsAlreadyConnected = (foundUser: Profile) => {
    if (!contacts || contacts.length === 0) return false;
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].user1_id === foundUser.id) return true;
      if (contacts[i].user2_id === foundUser.id) return true;
    }
  };

  const searchUserByNickname = async (value: string) => {
    const foundUsers = await selectProfilesByNickname(value);
    if (!foundUsers) return;
    const results = foundUsers.filter((foundUser: Profile) => {
      if (foundUser.id === loginUser.id) return false;
      if (checkIsAlreadyConnected(foundUser)) return false;
      return true;
    });
    setSearchResults(results);
  };
  const isValid = (data: SearchUserFormInputs) => {
    if (data.mode === "nickname") searchUserByNickname(data.searchInput);
    // else if (data.mode === "email") searchUserByEmail(data.searchInput);
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(isValid)} className={styles.search_form}>
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
            <button className={styles.button} disabled={isContactsLoading}>
              検索
            </button>
          </span>
        </div>
      </form>
      {loginUser && searchResults && (
        <div>
          {searchResults!.length !== 0 ? (
            <ul>
              <>
                {searchResults.map((user) => (
                  <SearchResult key={user.id} loginUser={loginUser} foundUser={user} />
                ))}
              </>
            </ul>
          ) : (
            <p>ユーザが見つかりませんでした。</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AddContact;
