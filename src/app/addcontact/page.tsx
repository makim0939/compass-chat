"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { loginUserAtom } from "../atoms";
import { Profile } from "../types/database.types";
import styles from "./addcontact.module.scss";
import useContact from "./hooks/useContact";
import SearchResult from "./components/SearchResult";
import { selectProfilesByNickname } from "../utils/supabaseFunctions";
import BackwardIcon from "../components/icon/BackwardIcon";
import { ICON_COLOR_DARK, ICON_SIZE_SMALL } from "@/app/ui.config";
import Container from "../components/Container";
import Button from "../components/form/Button";

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
  const router = useRouter();
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
        switch (name) {
          case "mode":
            if (data.mode === "unique_name") {
              setPlaceholder("ユーザID");
              resetField("searchInput", { defaultValue: "@" });
              break;
            }
            if (data.mode === "nickname") setPlaceholder("ニックネーム");
            if (data.mode === "email") setPlaceholder("example@email.com");
            resetField("searchInput", { defaultValue: "" });
            break;
          case "searchInput":
            if (data.mode !== "unique_name" || !data.searchInput) break;
            if (data.searchInput[0] !== "@") setValue("searchInput", "@" + data.searchInput);
            break;
        }
      },
      { mode: "nickname", searchInput: "" },
    );
    return () => {
      watchInputs.unsubscribe();
    };
  }, [watch, setPlaceholder, resetField, setValue]);

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
      <Container>
        <header>
          <BackwardIcon
            size={ICON_SIZE_SMALL}
            fill={ICON_COLOR_DARK}
            margin="0 16px 0 0"
            onClick={() => router.push("/")}
          />
          <h3>連絡先を追加</h3>
          <div style={{ width: ICON_SIZE_SMALL, margin: "0 8px" }}></div>
        </header>
        <form onSubmit={handleSubmit(isValid)} className={styles.search_form}>
          <div className={styles.input_row}>
            <div>
              <label htmlFor="">ユーザを検索</label>
              <select {...register("mode")} name="mode" className={styles.input_select}>
                <option value="nickname">ニックネーム</option>
                <option value="email">メールアドレス</option>
                <option value="unique_name">ユーザID</option>
              </select>
            </div>
            <input
              {...register("searchInput", { required: true })}
              type="text"
              name="searchInput"
              placeholder={placeholder}
              className={styles.input_text}
            />
          </div>
          <div className={styles.form_buttons}>
            <Button value="検索" type="submit" disabled={isContactsLoading} />
          </div>
        </form>

        {loginUser && searchResults && (
          <div className={styles.search_result_container}>
            {searchResults!.length !== 0 ? (
              <ul>
                {searchResults.map((user) => (
                  <SearchResult key={user.id} loginUser={loginUser} foundUser={user} />
                ))}
              </ul>
            ) : (
              <p>ユーザが見つかりませんでした。</p>
            )}
          </div>
        )}
      </Container>
    </div>
  );
};

export default AddContact;
