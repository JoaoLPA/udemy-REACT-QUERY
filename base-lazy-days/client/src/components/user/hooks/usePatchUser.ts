import { useMutation, useQueryClient } from "@tanstack/react-query";
import jsonpatch from "fast-json-patch";

import type { User } from "@shared/types";

import { axiosInstance, getJWTHeader } from "../../../axiosInstance";
import { useUser } from "./useUser";

import { toast } from "@/components/app/toast";

export const QUERY_KEY = "patch-user";

// for when we need a server function
async function patchUserOnServer(
  newData: User | null,
  originalData: User | null
): Promise<User | null> {
  if (!newData || !originalData) return null;
  // create a patch for the difference between newData and originalData
  const patch = jsonpatch.compare(originalData, newData);

  // send patched data to the server
  const { data } = await axiosInstance.patch(
    `/user/${originalData.id}`,
    { patch },
    {
      headers: getJWTHeader(originalData.token),
    }
  );
  return data.user;
}

export function usePatchUser() {
  const { user } = useUser();

  const queryClient = useQueryClient();

  const { mutate: patchUser } = useMutation({
    mutationKey: [QUERY_KEY],
    mutationFn: (newData: User) => patchUserOnServer(user, newData),
    onSuccess: () => {
      toast({ title: "User updated", status: "success" });
    },
    onError: () => {
      toast({ title: "User can not be updated", status: "error" });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });

  return patchUser;
}
