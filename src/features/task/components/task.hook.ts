import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTaskClient,
  deleteTaskClient,
  fetchTasks,
  updateTaskClient,
} from "../task.api.client";
import { Task } from "../task.schema";

export function useFetchTasks() {
  return useQuery({ queryKey: ["tasks"], queryFn: fetchTasks });
}

export function useCreateTask() {
  return useMutation({
    mutationFn: createTaskClient,

    // optimistic update
    onMutate: async (taskData, context) => {
      // cancel running update for this query key, to avoid overwrite optimistic update
      await context.client.cancelQueries({ queryKey: ["tasks"] });

      // snapshot for rollback
      const prevTasks = context.client.getQueryData<Task[]>(["tasks"]);

      const optimisticTask: Task = {
        id: crypto.randomUUID(),
        title: taskData.title,
        status: "todo",
        userId: crypto.randomUUID(),
      };

      // set optimistic update
      context.client.setQueryData(["tasks"], (old: Task[]) => [
        ...old,
        optimisticTask,
      ]);

      // old data untuk rollback
      return { prevTasks };
    },
    onError: async (error, taskData, onMutateResult, context) => {
      // kalo error, ganti lagi tasks yg optimistic dengan prev tasks
      context.client.setQueryData(["tasks"], onMutateResult?.prevTasks);
    },
    onSettled: async (data, error, taskData, onMutateResult, context) => {
      context.client.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useDeleteTask() {
  return useMutation({
    mutationFn: deleteTaskClient,
    onMutate: async (taskId, context) => {
      // cancel running update for this query key, to avoid overwrite optimistic update
      await context.client.cancelQueries({ queryKey: ["tasks"] });

      // snapshot for rollback
      const prevTasks = context.client.getQueryData<Task[]>(["tasks"]) || [];

      const optimisticTasks: Task[] = prevTasks?.filter((t) => t.id !== taskId);

      // set optimistic update
      context.client.setQueryData(["tasks"], optimisticTasks);

      // old data untuk rollback
      return { prevTasks };
    },
    onError(error, variables, onMutateResult, context) {
      // rollback
      context.client.setQueryData(["tasks"], onMutateResult?.prevTasks);
    },
    onSettled: async (data, error, taskData, onMutateResult, context) => {
      context.client.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useToggleTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      params: Parameters<typeof updateTaskClient>[0],
    ): ReturnType<typeof updateTaskClient> => {
      const { taskId, data } = params;
      const newStatus = data.status === "todo" ? "done" : "todo";

      return updateTaskClient({ taskId, data: { status: newStatus } });
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
