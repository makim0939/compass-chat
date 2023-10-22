import React from "react";
import { useAtom } from "jotai";
import useRoomUserRelations from "../hooks/useRelationRoomUser";
import { loginUserAtom } from "@/app/atoms";
import TalkRoomsListItem from "./TalkRoomsListItem";

const TalkRoomsList = () => {
  const [loginUser] = useAtom(loginUserAtom);
  if (!loginUser) throw new Error("loginUser is undefined");
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
                <ul>
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
