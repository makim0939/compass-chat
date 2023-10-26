"use client";
import supabase from "@/app/utils/supabase";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { Session } from "@supabase/supabase-js";

const useSession = (): UseQueryResult<Session> => {
  const getSession = async () => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) throw error;
      return session;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return useQuery({
    queryKey: ["session"],
    queryFn: getSession,
    staleTime: 5 * 60 * 1000,
  });
};

export default useSession;
