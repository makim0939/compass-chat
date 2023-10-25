"use client";
import React, { useEffect, useState } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Session } from "@supabase/supabase-js";
import { Profile } from "@/app/types/database.types";
import { fetchData } from "@/app/utils/clientFunctions";
import { set } from "react-hook-form";
import supabase from "@/app/utils/supabase";

const useLoginUser = (session: Session | undefined): UseQueryResult<Profile | null> => {
  const fetchUserById = async () => {
    try {
      const { data: loginUser, error } = await supabase
        .from("profile")
        .select("*")
        .eq("id", session!.user.id)
        .single();
      return loginUser;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return useQuery({
    queryKey: ["loginUser", session?.user?.id],
    queryFn: fetchUserById,
    staleTime: Infinity,
    enabled: !!session,
  });
};

export default useLoginUser;
