import { Profile, RoomUserRelation } from "@/app/types/types";
import { fetchData } from "@/app/utils/clientFunctions";
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
      const url = document.location.origin + "/api/room_user/room_id/" + room_id;
      const roomUserRelations = await fetchData<RoomUserRelation[]>(url);
      const roomMemberRelations = roomUserRelations.filter(
        (roomUserRelation) => roomUserRelation.user_id !== loginUserId,
      );
      if (!roomMemberRelations) return [];
      const Members = await Promise.all(
        roomMemberRelations.map(async (roomUserRelation) => {
          const url = document.location.origin + "/api/profile/id/" + roomUserRelation.user_id;
          const Member = await fetchData<Profile>(url);
          return Member;
        }),
      );
      return Members;
    },
  });
export default useMembers;
