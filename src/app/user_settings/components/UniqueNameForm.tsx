import React, { useEffect } from "react";
import { Profile } from "@/app/types/database.types";
import useProfileMutation from "../hooks/useProfileMutation";
import { updateProfile } from "@/app/utils/supabaseFunctions";
import { ICON_COLOR_DARK, ICON_SIZE_SMALL } from "@/app/ui.config";
import BackwardIcon from "@/app/components/icon/BackwardIcon";
import styles from "./settings_form.module.scss";
import Container from "@/app/components/Container";
import Button from "@/app/components/form/Button";

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
    <Container>
      <header className={styles.header}>
        <BackwardIcon
          size={ICON_SIZE_SMALL}
          fill={ICON_COLOR_DARK}
          margin="0 8px 0 0"
          onClick={() => setDisplay("none")}
        />
        <h3>ユーザID</h3>
        <div style={{ width: ICON_SIZE_SMALL, margin: "0 8px" }}></div>
      </header>
      <form onSubmit={handleSubmit} className={styles.form}>
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
          <Button value="設定" type="submit" />
        </div>
      </form>
    </Container>
  );
};

export default UniqueNameForm;
