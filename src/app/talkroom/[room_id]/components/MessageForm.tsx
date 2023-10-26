import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "../talkroom.module.scss";
import { Profile, Room } from "@/app/types/database.types";
import { useMessagesMutation } from "../hooks/useMessagesMutation";

type MessageFormInput = {
  message: string;
};

const MessageForm = ({ talkRoom, loginUser }: { talkRoom: Room; loginUser: Profile }) => {
  const messageMutation = useMessagesMutation({ room_id: talkRoom.id });

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<MessageFormInput>();

  const sendMessage = async (inputs: MessageFormInput) => {
    const data = {
      message: inputs.message,
      room_id: talkRoom.id,
      sender_id: loginUser.id,
    };
    messageMutation.mutate(data);
    reset();
  };
  return (
    <div className={styles.form_container}>
      <form onSubmit={handleSubmit(sendMessage)} className={styles.form} name="messageForm">
        <div className={styles.form_contents}>
          <span className={styles.input_left_space}></span>
          <span className={styles.input_container}>
            <input
              {...register("message", { required: true })}
              type="text"
              className={styles.input_text}
            />
            <button type="submit" className={styles.button}>
              送信
            </button>
          </span>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;
