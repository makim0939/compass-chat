import { MessageData } from "@/app/types/database.types";
import { postData } from "@/app/utils/clientFunctions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

type MessagePostProps = {
  message: string;
  room_id: number;
  sender_id: string;
};
export const useMessagesMutation = ({ room_id }: { room_id: number }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: MessagePostProps): Promise<MessageData> => {
      const url = document.location.origin + "/api/message/room_id/" + room_id;
      return await postData<MessageData>({ url, data });
    },
    onSuccess: (result: MessageData) => {
      queryClient.setQueryData<MessageData[]>(["messages", room_id.toString()], (old) =>
        old ? [...old, result] : [result],
      );
    },
  });
};
