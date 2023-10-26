import { MessageData } from "@/app/types/database.types";
import { selectMessagesByRoomId } from "@/app/utils/supabaseFunctions";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

const useMessages = (room_id: number): UseQueryResult<MessageData[]> =>
  useQuery({
    queryKey: ["messages", room_id],
    queryFn: async () => {
      const messages = await selectMessagesByRoomId(room_id);
      if (!messages) return [];
      return messages;
    },
    staleTime: Infinity,
  });
export default useMessages;
