"use client";
import React from "react";
import { useAtom } from "jotai";
import { loginUserAtom } from "@/app/atoms";
import { Profile } from "@/app/types/database.types";

const Home = () => {
  const [loginUser] = useAtom(loginUserAtom);
  if (!loginUser) throw new Error("loginUser is undefined");
  return <div>Home {loginUser.nickname}</div>;
};

export default Home;
