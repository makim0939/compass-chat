import { MessageData, Profile, Room } from "@/app/types/database.types";
import React from "react";
import styles from "../talkroom.module.scss";

const Message = ({
  message,
  talkRoom,
  loginUser,
}: {
  message: MessageData;
  talkRoom: Room;
  loginUser: Profile;
}) => {
  return (
    <>
      {message.sender_id === loginUser.id ? (
        <li className={styles.my_post}>
          <div className={styles.message_container}>
            <p className={styles.message}>{message.message}</p>
          </div>
        </li>
      ) : (
        <li>
          <div className={styles.message_container}>
            <span className={styles.icon}></span>
            <span>
              <p className={styles.message}>{message.message}</p>
            </span>
          </div>
        </li>
      )}
    </>
  );
};

export default Message;
