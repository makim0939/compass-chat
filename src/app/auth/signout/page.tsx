"use client";
import supabase from "@/app/utils/supabase";
import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { loginUserAtom } from "@/app/atoms";
import Link from "next/link";

const SignOut = () => {
  const [, setLoginUser] = useAtom(loginUserAtom);

  useEffect(() => {
    const signOut = async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw new Error("signOut error");
      setLoginUser(null);
    };
    signOut();
  }, [setLoginUser]);
  return (
    <div>
      <h2>ログアウトしました</h2>
      <Link href={"/auth"}>ログインページへ</Link>
    </div>
  );
};

export default SignOut;