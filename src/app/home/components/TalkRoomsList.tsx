import React from "react";
import useRoomUserRelations from "../hooks/useRelationRoomUser";
import TalkRoomsListItem from "./TalkRoomsListItem";
import { Profile } from "@/app/types/database.types";
import styles from "../home.module.scss";

const TalkRoomsList = ({ loginUser }: { loginUser: Profile }) => {
  const { data: roomUserRelations, isLoading: isRelationsLoading } = useRoomUserRelations(
    loginUser?.id,
  );

  if (isRelationsLoading) return <div>Loading...</div>;
  if (!roomUserRelations) return;
  return (
    <>
      {roomUserRelations.length === 0 ? (
        <div>トークルームがありません</div>
      ) : (
        <ul className={styles.talkroom_list}>
          {roomUserRelations.map((roomUserRelation) => (
            <TalkRoomsListItem key={roomUserRelation.id} roomUserRelation={roomUserRelation} />
          ))}
        </ul>
      )}
    </>
  );
};
export default TalkRoomsList;
