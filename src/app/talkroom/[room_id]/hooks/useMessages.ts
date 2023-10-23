import { MessageData } from "@/app/types/database.types";
import { fetchData } from "@/app/utils/clientFunctions";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

const useMessages = (room_id: number): UseQueryResult<MessageData[]> =>
  useQuery({
    queryKey: ["messages", room_id],
    queryFn: async () => {
      const url = document.location.origin + "/api/message/room_id/" + room_id;
      const messages = await fetchData(url);
      return messages;
    },
    staleTime: Infinity,
  });
export default useMessages;
