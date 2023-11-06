import { Profile, ProfileUpdateProps } from "@/app/types/types";
import { insertMessage, updateProfile } from "@/app/utils/supabaseFunctions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useProfileMutation = (loginUserId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ProfileUpdateProps): Promise<Profile | null> => {
      return await updateProfile({ id: loginUserId, updateData: data });
    },
    onSuccess: (result: Profile | null) => {
      if (!result) return;
      queryClient.setQueryData<Profile>(["loginUser", loginUserId], (old) => result);
    },
  });
};

export default useProfileMutation;
