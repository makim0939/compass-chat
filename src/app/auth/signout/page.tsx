"use client";
import supabase from "@/app/utils/supabase";
import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { loginUserAtom } from "@/app/atoms";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";

const SignOut = () => {
  const [, setLoginUser] = useAtom(loginUserAtom);
  const queryClient = useQueryClient();

  useEffect(() => {
    const signOut = async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw new Error("signOut error");
      setLoginUser(null);
      queryClient.clear();
    };
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, "", window.location.href);
    };
    signOut();
  }, [setLoginUser, queryClient]);

  return (
    <div>
      <h2>ログアウトしました</h2>
      <Link href={"/auth"}>ログインページへ</Link>
    </div>
  );
};

export default SignOut;
