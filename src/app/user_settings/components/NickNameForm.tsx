import React, { useEffect } from "react";
import { Profile } from "@/app/types/database.types";
import { updateProfile } from "@/app/utils/supabaseFunctions";
import useProfileMutation from "../hooks/useProfileMutation";
import BackwardIcon from "@/app/components/icon/BackwardIcon";
import { ICON_COLOR_DARK, ICON_SIZE_SMALL } from "@/app/ui.config";
import styles from "./settings_form.module.scss";
import Container from "@/app/components/Container";

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
  useEffect(() => {
    document.getElementById("input")!.focus();
  }, []);
  return (
    <Container>
      <header>
        <BackwardIcon
          size={ICON_SIZE_SMALL}
          fill={ICON_COLOR_DARK}
          margin="0 8px 0 0"
          onClick={() => setDisplay("none")}
        />
        <h3>ニックネーム</h3>
        <div style={{ width: ICON_SIZE_SMALL, margin: "0 8px" }}></div>
      </header>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          name="nickname"
          type="text"
          className={styles.text_input}
          id="input"
          placeholder="ニックネーム"
          defaultValue={loginUser.nickname}
        />
        <div className={styles.button_container}>
          <button type="submit" className={styles.submit_button}>
            設定
          </button>
        </div>
      </form>
    </Container>
  );
};

export default NickNameForm;
