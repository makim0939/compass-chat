"use client";
import React, { useEffect, useState } from "react";
import useSession from "../auth/hooks/useSession";
import { useForm } from "react-hook-form";
import { ProfileInsertProps } from "../types/types";
import { useRouter } from "next/navigation";
import styles from "./createprofile.module.scss";
import { insertProfile, selectProfileById } from "../utils/supabaseFunctions";
import Container from "../components/Container";
import Button from "../components/form/Button";

const CreateProfile = () => {
  const { data: session, isLoading: isSessionLoading } = useSession();
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
    const watchInputs = watch(
      (data, { name, type }) => {
        switch (name) {
          case "unique_name":
            if (!data.unique_name) break;
            if (data.unique_name[0] !== "@") setValue("unique_name", "@" + data.unique_name);
            break;
        }
      },
      { unique_name: "" },
    );

    const checkProfileExist = async () => {
      const profile = await selectProfileById(session!.user.id);
      if (profile) {
        router.replace("/");
      }
      setIsChecked(true);
    };
    if (isSessionLoading) return;
    if (!session) {
      router.replace("/auth");
      return;
    }
    checkProfileExist();
    return () => {
      watchInputs.unsubscribe();
    };
  }, [router, session, isSessionLoading, watch, setValue]);

  if (!isChecked) return;
  return (
    <div className={styles.wrapper}>
      <Container>
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
                placeholder="ニックネーム"
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
                placeholder="@user_id"
              />
              {errors.unique_name && (
                <span className={styles.input_error}>{errors.unique_name.message}</span>
              )}
            </div>
          </div>

          <div className={styles.form_buttons}>
            <div></div>
            <Button value="登録" type="submit" />
          </div>
        </form>
      </Container>
    </div>
  );
};

export default CreateProfile;
