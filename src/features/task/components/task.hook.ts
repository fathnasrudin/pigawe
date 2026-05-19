import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTaskClient, fetchTasks } from "../task.api.client";

export function useFetchTasks() {
  return useQuery({ queryKey: ["tasks"], queryFn: fetchTasks });
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTaskClient,
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
