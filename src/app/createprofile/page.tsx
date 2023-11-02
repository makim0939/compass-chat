"use client";
import React, { useEffect, useState } from "react";
import useSession from "../auth/hooks/useSession";
import { set, useForm } from "react-hook-form";
import { useAtom } from "jotai";
import { loginUserAtom } from "../atoms";
import { fetchData, postData } from "../utils/clientFunctions";
import { ProfileInsertProps } from "../types/types";
import { useRouter } from "next/navigation";
import styles from "./createprofile.module.scss";
import { insertProfile, selectProfileById } from "../utils/supabaseFunctions";

const CreateProfile = () => {
  const { data: session } = useSession();
  const userId = session && session.user ? session.user.id : null;
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    resetField,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProfileInsertProps>();

  const isValid = async (data: ProfileInsertProps) => {
    if (!userId) return;
    data.id = userId;
    const profile = await insertProfile(data);
    router.replace("/");
  };

  useEffect(() => {
    const checkProfileExist = async () => {
      const profile = await selectProfileById(session!.user.id);
      if (profile) {
        router.replace("/");
      }
      setIsChecked(true);
    };
    if (!session) return;
    checkProfileExist();
  }, [router, session, setIsChecked]);

  return (
    <>
      {isChecked && (
        <div>
          <form onSubmit={handleSubmit(isValid)} className={styles.form}>
            <div className={styles.index}>
              <h2>ユーザ名を設定</h2>
            </div>
            <div className={styles.input_wrapper}>
              <div className={styles.input_row}>
                <label htmlFor="">ニックネーム</label>
                <input
                  {...register("nickname", { required: "ニックネームを入力してください" })}
                  type="text"
                  className={styles.input_text}
                />
                {errors.nickname && (
                  <span className={styles.input_error}>{errors.nickname.message}</span>
                )}
              </div>
              <div className={styles.input_row}>
                <label htmlFor="">ユーザID</label>
                <input
                  {...register("unique_name", { required: "ユーザIDを入力してください" })}
                  type="text"
                  className={styles.input_text}
                />
                {errors.unique_name && (
                  <span className={styles.input_error}>{errors.unique_name.message}</span>
                )}
              </div>
            </div>

            <div className={styles.form_buttons}>
              <div></div>
              <button className={styles.button}>登録</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default CreateProfile;
