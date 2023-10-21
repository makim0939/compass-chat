import React from "react";
import useSession from "../hooks/useSession";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  //セッションの確認
  const session = useSession();
  //ログインしているユーザの取得
  const user = useLoginUser(session);
  //atomにセット

  return <div>children</div>;
};

export default AuthGuard;
