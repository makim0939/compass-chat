"use client";
import { loginUserAtom } from "@/app/atoms";
import { useAtom } from "jotai";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import useTalkRoom from "./hooks/useTalkRoom";
import useMembers from "./hooks/useMembers";
import useMessages from "./hooks/useMessages";
import {
  RealTimeListenerOptions,
  subscribeRealTimeListener,
  unsubscribeRealTimeListener,
} from "@/app/utils/realTimeListener";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { MessageData } from "@/app/types/database.types";
import styles from "./talkroom.module.scss";
import Message from "./components/Message";
import useMessageScroll from "./hooks/useMessageScroll";
import MessageForm from "./components/MessageForm";
import Compass from "@/app/compass/Compass";
import BackwardIcon from "@/app/components/ui/icon/BackwardIcon";
import { ICON_COLOR_DARK, ICON_SIZE_SMALL } from "@/app/ui.config";

const TalkRoom = ({ params }: { params: { room_id: number } }) => {
  const [loginUser] = useAtom(loginUserAtom);
  if (!loginUser) throw new Error("loginUser is null");
  const { data: talkRoom, isLoading: isTalkRoomRoading } = useTalkRoom(params.room_id);
  const { data: members, isLoading: isMembersLoading } = useMembers({
    room_id: params.room_id,
    loginUserId: loginUser.id,
  });
  const { data: messages, isLoading: isMessagesLoading } = useMessages(params.room_id);

  const router = useRouter();
  const queryClient = useQueryClient();
  const scrollBottomRef = useRef<HTMLDivElement>(null);
  const scrollEnabled = !!talkRoom && !!members && !!messages;
  useMessageScroll({ ref: scrollBottomRef, messages, scrollEnabled });

  useEffect(() => {
    const onFetchMessageCallback = (
      payload: RealtimePostgresChangesPayload<{
        [key: string]: any;
      }>,
    ) => {
      if (payload.eventType === "INSERT") {
        const data = payload.new as MessageData;
        if (data.sender_id === loginUser.id) return;
        queryClient.setQueryData<MessageData[]>(["messages", params.room_id.toString()], (old) =>
          old ? [...old, data] : [data],
        );
      }
    };
    if (!loginUser) return;
    const listenerOptions: RealTimeListenerOptions = {
      channel: "talk" + params.room_id,
      filter: {
        event: "*",
        schema: "public",
        table: "message",
        filter: `room_id=eq.${params.room_id}`,
      },
      callback: onFetchMessageCallback,
    };
    const channel = subscribeRealTimeListener(listenerOptions);
    return () => {
      if (!channel) return;
      unsubscribeRealTimeListener(channel);
    };
  }, [loginUser, params.room_id, queryClient]);

  if (!talkRoom || !messages || !members)
    return <div id="scrollTarget" className={styles.scroll_ref} ref={scrollBottomRef}></div>;
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <span className={styles.header_contents}>
          <BackwardIcon
            size={ICON_SIZE_SMALL}
            fill={ICON_COLOR_DARK}
            margin="0 8px 0 0"
            onClick={() => router.push("/")}
          />

          {members.map((member) => (
            <div key={member.id}>
              {member.id !== loginUser.id && <h3 className={styles.index}>{member.nickname}</h3>}
            </div>
          ))}
        </span>
      </header>
      <Compass loginUser={loginUser} room_id={params.room_id} member={members[0]} />

      <main className={styles.main}>
        <div className={styles.talk_container}>
          <ul>
            {messages.map((message) => (
              <Message
                key={message.id}
                message={message}
                loginUser={loginUser}
                sentUser={members.find((member) => member.id === message.sender_id)}
              />
            ))}
            <div id="scrollTarget" className={styles.scroll_ref} ref={scrollBottomRef}></div>
          </ul>
        </div>
      </main>
      <MessageForm talkRoom={talkRoom} loginUser={loginUser} />
    </div>
  );
};

export default TalkRoom;
