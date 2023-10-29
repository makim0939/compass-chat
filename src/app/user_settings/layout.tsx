import React from "react";
import AuthGuard from "../auth/components/AuthGuard";

const UserSettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return <AuthGuard>{children}</AuthGuard>;
};

export default UserSettingsLayout;
