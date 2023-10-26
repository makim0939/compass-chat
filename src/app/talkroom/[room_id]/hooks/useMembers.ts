import { Profile, RoomUserRelation } from "@/app/types/types";
import { selectProfileById, selectRoomUserRelationsByRoomId } from "@/app/utils/supabaseFunctions";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

const useMembers = ({
  room_id,
  loginUserId,
}: {
  room_id: number;
  loginUserId: string;
}): UseQueryResult<Profile[]> =>
  useQuery({
    queryKey: ["members", room_id],
    queryFn: async () => {
      //ルームidからメンバーを取得
      //→ルーム→ルームユーザー[]→プロフィール[]
      const roomUserRelations = await selectRoomUserRelationsByRoomId(room_id);

      if (!roomUserRelations) return [];
      const roomMemberRelations = roomUserRelations.filter(
        (roomUserRelation) => roomUserRelation.user_id !== loginUserId,
      );
      if (!roomMemberRelations) return [];
      const members = await Promise.all(
        roomMemberRelations.map(async (roomUserRelation) => {
          const member = await selectProfileById(roomUserRelation.user_id);
          return member;
        }),
      );
      return members;
    },
    staleTime: Infinity,
  });
export default useMembers;
