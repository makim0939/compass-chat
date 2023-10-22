import { fetchData } from "@/app/utils/clientFunctions";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { RoomUserRelation } from "@/app/types/types";

const useRoomUserRelations = (userId: string): UseQueryResult<RoomUserRelation[]> =>
  useQuery({
    queryKey: ["room_user", userId],
    queryFn: async () => {
      const url = document.location.origin + "/api/room_user/user_id/" + userId;
      const roomUserRelations = await fetchData(url);
      return roomUserRelations;
    },
    staleTime: Infinity,
  });

export default useRoomUserRelations;
