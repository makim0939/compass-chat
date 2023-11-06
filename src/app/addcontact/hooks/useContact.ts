import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Connection } from "@/app/types/types";
import { selectConnectionsByUserId } from "@/app/utils/supabaseFunctions";

const useContact = (user_id: string | undefined): UseQueryResult<Connection[]> => {
  return useQuery({
    queryKey: ["contact", user_id],
    queryFn: async () => selectConnectionsByUserId(user_id!),
    staleTime: Infinity,
    enabled: !!user_id,
  });
};

export default useContact;
