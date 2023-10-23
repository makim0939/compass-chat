import { Room } from "@/app/types/types";
import { fetchData } from "@/app/utils/clientFunctions";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

const useTalkRoom = (roomId: number): UseQueryResult<Room> =>
  useQuery({
    queryKey: ["talkroom", roomId],
    queryFn: async () => {
      const url = document.location.origin + "/api/talkroom/room_id/" + roomId;
      const talkRoom = await fetchData(url);
      return talkRoom;
    },
    staleTime: Infinity,
  });

export default useTalkRoom;
