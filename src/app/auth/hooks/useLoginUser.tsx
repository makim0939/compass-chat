import React from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Session } from "@supabase/supabase-js";
import { Profile } from "@/app/types/database.types";

const getUser = async (id: string): Promise<Profile> => {
  console.log("fetch loginUser");
  const url = document.location.origin + "/api/user/id/" + id;
  const loginUser = await fetchData<Profile>(url);
  return loginUser;
};

const useLoginUser = ({ session }: { session: Session | undefined }): UseQueryResult<Profile> =>
  useQuery({
    queryKey: ["loginUser", session!.user.id],
    queryFn: async () => {
      getUser(session!.user.id);
    },
    staleTime: Infinity,
    enabled: !!session?.user?.id,
  });

export default useLoginUser;
