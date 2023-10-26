import { postData } from "@/app/utils/clientFunctions";
import { Profile, Room } from "@/app/types/database.types";
import React, { useContext, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Connection } from "@/app/types/types";
import {
  insertConnection,
  insertRoomUserRelation,
  insertTalkRoom,
} from "@/app/utils/supabaseFunctions";

const SearchResult = ({ loginUser, foundUser }: { loginUser: Profile; foundUser: Profile }) => {
  const [room, setRoom] = useState<Room | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);

  const createConnection = async ({
    user1_id,
    user2_id,
  }: {
    user1_id: string;
    user2_id: string;
  }) => {
    const data = { user1_id, user2_id };
    const connection = await insertConnection(data);
    console.log("create: connection", connection);
  };

  const createRoom = async () => {
    const room = await insertTalkRoom({});
    console.log("create: room", room);
    setRoom(room);
  };

  const createRoomUser = async ({
    room_id,
    user_id,
    talkroom_name,
  }: {
    room_id: number;
    user_id: string;
    talkroom_name: string;
  }) => {
    const data = { room_id, user_id, talkroom_name };
    const room_user = await insertRoomUserRelation(data);
    console.log("create: room_user", room_user);
  };

  const onClickUserItem = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setDisabled(true);
    await createConnection({ user1_id: loginUser.id, user2_id: foundUser.id });
    await createRoom();
  };

  useEffect(() => {
    if (!room || !loginUser) return;
    createRoomUser({
      room_id: room.id,
      user_id: loginUser.id,
      talkroom_name: foundUser.nickname!,
    });
    createRoomUser({
      room_id: room.id,
      user_id: foundUser.id,
      talkroom_name: loginUser.nickname!,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room]);

  return (
    <li>
      <div>
        <span>icon</span>
        <span>{foundUser.nickname}</span>
        <span>
          <button type="button" onClick={onClickUserItem} disabled={disabled}>
            リクエスト
          </button>
        </span>
      </div>
    </li>
  );
};

export default SearchResult;
