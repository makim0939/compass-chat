"use client";
import React, { useEffect } from "react";
import { useAtom } from "jotai";
import useSession from "../hooks/useSession";
import useLoginUser from "../hooks/useLoginUser";
import { loginUserAtom } from "@/app/atoms";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  //セッションの確認
  const { data: session } = useSession();
  //ログインしているユーザの取得
  const { data: user, isLoading: isUserLoading } = useLoginUser(session);
  //atomにセット
  const [loginUser, setLoginUser] = useAtom(loginUserAtom);
  useEffect(() => {
    if (!user) return;
    setLoginUser(user);
  }, [user]);

  return <>{loginUser && <div>{loginUser.nickname}でログインしています</div>}</>;
};

export default AuthGuard;
