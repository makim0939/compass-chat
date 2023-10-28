import { MessageData, Profile, Room } from "@/app/types/database.types";
import React from "react";
import styles from "../talkroom.module.scss";
import AvatarIcon from "@/app/components/AvatarIcon";

const Message = ({
  message,
  talkRoom,
  loginUser,
  sentUser,
}: {
  message: MessageData;
  talkRoom: Room;
  loginUser: Profile;
  sentUser: Profile | undefined;
}) => {
  return (
    <>
      {message.sender_id === loginUser.id || !sentUser ? (
        <li className={styles.my_post}>
          <div className={styles.message_container}>
            <p className={styles.message}>{message.message}</p>
          </div>
        </li>
      ) : (
        <li>
          <div className={styles.message_container}>
            <span className={styles.icon}>
              <AvatarIcon size={39} user={sentUser} />
            </span>
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
