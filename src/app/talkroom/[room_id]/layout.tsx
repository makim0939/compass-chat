import AuthGuard from "@/app/auth/components/AuthGuard";
import React from "react";

const TalkRoomLayout = ({ children }: { children: React.ReactNode }) => {
  return <AuthGuard>{children}</AuthGuard>;
};

export default TalkRoomLayout;
