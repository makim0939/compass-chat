import React from "react";
import AuthGuard from "../auth/components/AuthGuard";
import useContact from "./hooks/useContact";

const AddContactLayout = ({ children }: { children: React.ReactNode }) => {
  return <AuthGuard>{children}</AuthGuard>;
};

export default AddContactLayout;
