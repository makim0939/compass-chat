"use client";
import React, { useEffect } from "react";
import { useAtom } from "jotai";
import useSession from "../hooks/useSession";
import useLoginUser from "../hooks/useLoginUser";
import { loginUserAtom } from "@/app/atoms";
import { useRouter } from "next/navigation";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { data: session, isLoading: isSessionLoading } = useSession();
  const { data: user, isLoading: isUserLoading } = useLoginUser(session);
  const [loginUser, setLoginUser] = useAtom(loginUserAtom);

  const router = useRouter();

  useEffect(() => {
    if (isSessionLoading) return;
    if (!session) {
      router.push("/auth");
      return;
    }
    if (user) setLoginUser(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, session]);

  return <>{loginUser && children}</>;
};

export default AuthGuard;
