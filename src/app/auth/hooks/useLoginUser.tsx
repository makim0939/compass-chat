"use client";
import React, { useEffect, useState } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Session } from "@supabase/supabase-js";
import { Profile } from "@/app/types/database.types";
import { fetchData } from "@/app/utils/clientFunctions";
import { set } from "react-hook-form";

const getUser = async (id: string): Promise<Profile> => {
  console.log("fetch loginUser");
  const url = document.location.origin + "/api/profile/id/" + id;
  const loginUser = await fetchData<Profile>(url);
  return loginUser;
};

const useLoginUser = (session: Session | undefined): UseQueryResult<Profile> =>
  useQuery({
    queryKey: ["loginUser", session?.user?.id],
    queryFn: async () => {
      const loginUser = await getUser(session!.user.id);
      return loginUser;
    },
    staleTime: Infinity,
    enabled: !!session,
  });

export default useLoginUser;
