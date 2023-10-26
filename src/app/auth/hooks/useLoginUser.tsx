"use client";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Session } from "@supabase/supabase-js";
import { Profile } from "@/app/types/database.types";
import { selectProfileById } from "@/app/utils/supabaseFunctions";

const useLoginUser = (session: Session | undefined): UseQueryResult<Profile | null> => {
  return useQuery({
    queryKey: ["loginUser", session?.user?.id],
    queryFn: async () => selectProfileById(session!.user?.id),
    staleTime: Infinity,
    enabled: !!session,
  });
};

export default useLoginUser;
