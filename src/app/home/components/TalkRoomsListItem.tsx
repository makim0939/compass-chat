import React from "react";
import { Profile, RoomUserRelation } from "@/app/types/types";
import Link from "next/link";
import styles from "../home.module.scss";
import AvatarIcon from "@/app/components/AvatarIcon";
import useMembers from "@/app/talkroom/[room_id]/hooks/useMembers";

const TalkRoomsListItem = ({ roomUserRelation }: { roomUserRelation: RoomUserRelation }) => {
  const { data: member, isLoading: isMemberLoading } = useMembers({
    room_id: roomUserRelation.room_id,
    loginUserId: roomUserRelation.user_id,
  });
  return (
    <>
      {member && (
        <li className={styles.list}>
          <Link href={"./talkroom/" + roomUserRelation.room_id} className={styles.talkroom_link}>
            <div className={styles.talkroom_item}>
              <div className={styles.icon}>
                <AvatarIcon size={41} user={member[0]} />
              </div>
              <p>{roomUserRelation.talkroom_name}</p>
            </div>
          </Link>
        </li>
      )}
    </>
  );
};

export default TalkRoomsListItem;
