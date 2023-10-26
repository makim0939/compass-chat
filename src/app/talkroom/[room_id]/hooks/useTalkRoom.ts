import { Room } from "@/app/types/types";
import { selectTalkRoomById } from "@/app/utils/supabaseFunctions";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

const useTalkRoom = (roomId: number): UseQueryResult<Room> =>
  useQuery({
    queryKey: ["talkroom", roomId],
    queryFn: async () => selectTalkRoomById(roomId),
    staleTime: Infinity,
  });

export default useTalkRoom;
