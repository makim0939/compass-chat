"use client";
import React from "react";
import { useAtom } from "jotai";
import { loginUserAtom } from "@/app/atoms";
import { Profile } from "@/app/types/database.types";
import TalkRoomsList from "./TalkRoomsList";

const Home = () => {
  const [loginUser] = useAtom(loginUserAtom);
  if (!loginUser) throw new Error("loginUser is undefined");
  return (
    <div>
      <header>
        <h2>Home: {loginUser.nickname}</h2>
      </header>
      <div>
        <TalkRoomsList />
      </div>
    </div>
  );
};

export default Home;
