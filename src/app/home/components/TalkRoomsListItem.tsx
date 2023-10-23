import React from "react";
import { RoomUserRelation } from "@/app/types/types";
import Link from "next/link";
import styles from "../home.module.scss";

const TalkRoomsListItem = ({ roomUserRelation }: { roomUserRelation: RoomUserRelation }) => {
  return (
    <li className={styles.list}>
      <Link href={"./talkroom/" + roomUserRelation.room_id} className={styles.talkroom_link}>
        <div className={styles.talkroom_item}>
          <div className={styles.icon}></div>
          <p>{roomUserRelation.talkroom_name}</p>
        </div>
      </Link>
    </li>
  );
};

export default TalkRoomsListItem;
