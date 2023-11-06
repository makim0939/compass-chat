"use client";
import React, { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabase from "../utils/supabase";
import styles from "./auth.module.scss";
import * as ja from "./lib/locales/ja.json";
import { useRouter } from "next/navigation";
import { color } from "framer-motion";

const Authentication = () => {
  const [rootUrl, setRootUrl] = React.useState(""); //一瞬スタイル未適用の画面が表示されるのを防ぐ
  const router = useRouter();

  useEffect(() => {
    setRootUrl(window.location.origin);
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") router.push("/");
    });
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  if (rootUrl === "") return;
  return (
    <div className={styles.wrapper}>
      <div className={styles.auth_form_container}>
        <div>
          <Auth
            redirectTo={`${rootUrl}/`}
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: { brand: "rgb(42, 105, 210);", brandAccent: "rgb(38, 95, 190);" },
                },
              },
            }}
            providers={["google"]}
            localization={{
              variables: ja,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Authentication;
