"use client";
import { loginUserAtom } from "@/app/atoms";
import { useAtom } from "jotai";
import React, { use } from "react";
import useTalkRoom from "./hooks/useTalkRoom";
import useMembers from "./hooks/useMembers";

const TalkRoom = ({ params }: { params: { room_id: number } }) => {
  const [loginUser] = useAtom(loginUserAtom);
  //トークルームの取得
  const { data: talkRoom, isLoading: isTalkRoomRoading } = useTalkRoom(params.room_id);
  //メンバーの取得
  const { data: members, isLoading: isMembersLoading } = useMembers({
    room_id: params.room_id,
    loginUserId: loginUser.id,
  });
  //メッセージの取得

  return <div></div>;
};

export default TalkRoom;
