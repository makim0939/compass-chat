import React from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchData } from "@/app/utils/clientFunctions";
import { Connection } from "@/app/types/types";

const useContact = (user_id: string | undefined): UseQueryResult<Connection[]> =>
  useQuery({
    queryKey: ["contact", user_id],
    queryFn: async () => {
      const url = document.location.origin + "/api/connection/user_id/" + user_id;
      const contact = await fetchData(url);
      return contact;
    },
    staleTime: Infinity,
    enabled: !!user_id,
  });

export default useContact;
