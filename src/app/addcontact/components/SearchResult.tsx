import { postData } from "@/app/utils/clientFunctions";
import { Profile, Room } from "@/app/types/database.types";
import React, { useContext, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Connection } from "@/app/types/types";

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
    const url = document.location.origin + "/api/connection";
    const data = { user1_id, user2_id };
    const connection = await postData<Connection>({ url, data });
  };

  const createRoom = async () => {
    const url = document.location.origin + "/api/talkroom";
    const room = await postData<Room>({ url, data: {} });
    setRoom(room);
  };

  const createRoomUser = async ({
    room_id,
    user_id,
    usernames,
  }: {
    room_id: number;
    user_id: string;
    usernames: string;
  }) => {
    const url = document.location.origin + "/api/room_user";
    const data = { room_id, user_id, usernames };
    const room_user = await postData({ url, data });
    console.log("room_user", room_user);
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
      usernames: loginUser.nickname + "/" + foundUser.nickname,
    });
    createRoomUser({
      room_id: room.id,
      user_id: foundUser.id,
      usernames: foundUser.nickname + "/" + loginUser.nickname,
    });
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
