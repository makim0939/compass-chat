import React from "react";
import { RoomUserRelation } from "@/app/types/types";
import Link from "next/link";

const TalkRoomsListItem = ({ roomUserRelation }: { roomUserRelation: RoomUserRelation }) => {
  return (
    <li>
      <Link href={"./talkroom/" + roomUserRelation.room_id}>
        <div>
          <div></div>
          <p>{roomUserRelation.talkroom_name}</p>
        </div>
      </Link>
    </li>
  );
};

export default TalkRoomsListItem;
