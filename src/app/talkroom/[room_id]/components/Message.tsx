import { MessageData, Profile, Room } from "@/app/types/database.types";
import React from "react";
import styles from "../talkroom.module.scss";
import AvatarIcon from "@/app/components/AvatarIcon";
const AVATAR_ICON_SIZE = 39;

const Message = ({
  message,
  loginUser,
  sentUser,
}: {
  message: MessageData;
  loginUser: Profile;
  sentUser: Profile | undefined;
}) => {
  if (message.sender_id === loginUser.id || !sentUser)
    return (
      <li className={styles.my_post}>
        <div className={styles.message_container}>
          <p className={styles.message}>{message.message}</p>
        </div>
      </li>
    );
  return (
    <li>
      <div className={styles.message_container}>
        <div className={styles.icon}>
          <AvatarIcon size={AVATAR_ICON_SIZE} user={sentUser} />
        </div>
        <div>
          <p className={styles.message}>{message.message}</p>
        </div>
      </div>
    </li>
  );
};

export default Message;
