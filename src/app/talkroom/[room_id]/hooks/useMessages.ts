import { fetchData } from "@/app/utils/clientFunctions";
import { useQuery } from "@tanstack/react-query";

const useMessages = (room_id: number) =>
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
