import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { RoomUserRelation } from "@/app/types/types";
import { selectRoomUserRelationsByUserId } from "@/app/utils/supabaseFunctions";

const useRoomUserRelations = (userId: string): UseQueryResult<RoomUserRelation[]> =>
  useQuery({
    queryKey: ["room_user", userId],
    queryFn: async () => selectRoomUserRelationsByUserId(userId),
    staleTime: Infinity,
  });

export default useRoomUserRelations;
