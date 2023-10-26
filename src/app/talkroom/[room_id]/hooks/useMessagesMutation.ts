import { MessageData, MessageInsertProps } from "@/app/types/types";
import { insertMessage } from "@/app/utils/supabaseFunctions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMessagesMutation = ({ room_id }: { room_id: number }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: MessageInsertProps): Promise<MessageData | null> => {
      return await insertMessage(data);
    },
    onSuccess: (result: MessageData | null) => {
      if (!result) return;
      queryClient.setQueryData<MessageData[]>(["messages", room_id.toString()], (old) =>
        old ? [...old, result] : [result],
      );
    },
  });
};
