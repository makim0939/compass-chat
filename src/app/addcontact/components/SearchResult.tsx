import React, { useState } from "react";
import { ConnectionInsertProps, RoomUserRelationInsertProps } from "@/app/types/types";
import {
  insertConnection,
  insertRoomUserRelation,
  insertTalkRoom,
} from "@/app/utils/supabaseFunctions";
import AvatarIcon from "@/app/components/AvatarIcon";
import { Profile } from "@/app/types/database.types";
import styles from "./searchResult.module.scss";
import { HOME_AVATAR_SIZE } from "@/app/home/components/Home";

const SearchResult = ({ loginUser, foundUser }: { loginUser: Profile; foundUser: Profile }) => {
  const [disabled, setDisabled] = useState<boolean>(false);

  const createConnection = async (data: ConnectionInsertProps) => {
    const connection = await insertConnection(data);
    return connection;
  };

  const createRoom = async () => {
    const room = await insertTalkRoom({});
    return room;
  };

  const createRoomUser = async (data: RoomUserRelationInsertProps) => {
    const room_user = await insertRoomUserRelation(data);
    return room_user;
  };

  const onClickUserItem = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setDisabled(true);
    await createConnection({ user1_id: loginUser.id, user2_id: foundUser.id });
    const room = await createRoom();
    if (!room) throw new Error("Failed to create room");
    await createRoomUser({
      room_id: room.id,
      user_id: loginUser.id,
      talkroom_name: foundUser.nickname,
    });
    await createRoomUser({
      room_id: room.id,
      user_id: foundUser.id,
      talkroom_name: loginUser.nickname,
    });
  };

  return (
    <li className={styles.profile_list}>
      <div className={styles.profile}>
        <div className={styles.avatar_icon}>
          <AvatarIcon size={HOME_AVATAR_SIZE} user={foundUser} />
        </div>
        <p>{foundUser.nickname}</p>
      </div>

      <div>
        <button
          type="button"
          onClick={onClickUserItem}
          disabled={disabled}
          className={styles.request_button}
        >
          リクエスト
        </button>
      </div>
    </li>
  );
};

export default SearchResult;
