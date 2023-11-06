"use client";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Session } from "@supabase/supabase-js";
import { Profile } from "@/app/types/database.types";
import { selectProfileById } from "@/app/utils/supabaseFunctions";

const useLoginUser = (session: Session | undefined): UseQueryResult<Profile | null> => {
  return useQuery({
    queryKey: ["loginUser", session!.user.id],
    queryFn: async () => {
      const loginUser = await selectProfileById(session!.user?.id);
      if (!loginUser) throw new Error("no loginUser");
      return loginUser;
    },
    staleTime: Infinity,
    enabled: !!session,
    retry: false,
  });
};

export default useLoginUser;
