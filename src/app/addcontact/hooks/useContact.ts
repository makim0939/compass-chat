import React from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchData } from "@/app/utils/clientFunctions";
import { Profile } from "@/app/types/database.types";

const useContact = (user_id: string | undefined): UseQueryResult<Profile[]> =>
  useQuery({
    queryKey: ["contact", user_id],
    queryFn: async () => {
      const url = document.location.origin + "/api/connection/user1_id/" + user_id;
      const contact = await fetchData(url);
      return contact;
    },
    enabled: !!user_id,
  });

export default useContact;
