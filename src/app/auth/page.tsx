"use client";
import React, { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabase from "../utils/supabase";
import styles from "./auth.module.scss";
import * as ja from "./lib/locales/ja.json";
import { useRouter } from "next/navigation";

const Authentication = () => {
  const [mounted, setMounted] = React.useState(false); //一瞬スタイル未適用の画面が表示されるのを防ぐ
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") router.push("/");
    });
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  return (
    <>
      {mounted && (
        <div className={styles.wrapper}>
          <div className={styles.auth_form_container}>
            <div>
              <Auth
                redirectTo={`${window.location.origin}/`}
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                providers={["google"]}
                localization={{
                  variables: ja,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Authentication;
