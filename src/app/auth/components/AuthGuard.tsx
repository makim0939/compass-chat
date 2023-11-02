"use client";
import React, { useEffect } from "react";
import { useAtom } from "jotai";
import useSession from "../hooks/useSession";
import useLoginUser from "../hooks/useLoginUser";
import { loginUserAtom } from "@/app/atoms";
import { useRouter } from "next/navigation";
import { selectProfileById } from "@/app/utils/supabaseFunctions";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { data: session, isLoading: isSessionLoading } = useSession();
  const { data: user, isLoading: isUserLoading } = useLoginUser(session);
  const [loginUser, setLoginUser] = useAtom(loginUserAtom);

  const router = useRouter();

  useEffect(() => {
    const isExistProfile = async () => {
      const profile = selectProfileById(session!.user.id);
      if (!profile) return false;
      return true;
    };
    if (isSessionLoading) return;
    if (!session) {
      router.push("/auth");
      return;
    }
    if (!isUserLoading && !user) router.push("createprofile/");
    if (user) setLoginUser(user);
  }, [user, session, isSessionLoading, isUserLoading, setLoginUser, router]);

  return <>{loginUser && children}</>;
};

export default AuthGuard;
