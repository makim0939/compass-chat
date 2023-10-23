import React from "react";
import useRoomUserRelations from "../hooks/useRelationRoomUser";
import TalkRoomsListItem from "./TalkRoomsListItem";
import { Profile } from "@/app/types/database.types";
import styles from "../home.module.scss";

const TalkRoomsList = ({ loginUser }: { loginUser: Profile }) => {
  //所属するtalkroom一覧を取得
  const { data: roomUserRelations, isLoading: isRelationsLoading } = useRoomUserRelations(
    loginUser?.id,
  );

  return (
    <div>
      {isRelationsLoading ? (
        <div>Loading</div>
      ) : (
        <div>
          {roomUserRelations && (
            <>
              {roomUserRelations.length === 0 ? (
                <div>トークルームがありません</div>
              ) : (
                <ul className={styles.talkroom_list}>
                  {roomUserRelations.map((roomUserRelation) => (
                    <TalkRoomsListItem
                      key={roomUserRelation.id}
                      roomUserRelation={roomUserRelation}
                    />
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
export default TalkRoomsList;
