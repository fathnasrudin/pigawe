import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTaskClient,
  deleteTaskClient,
  fetchTasks,
  updateTaskClient,
} from "../task.api.client";
import { Task, TaskSearchParamsSchema } from "../task.schema";
import { QUERY_KEYS } from "@/constants/query-keys";

export function useFetchTasks(options?: {
  searchParams?: TaskSearchParamsSchema;
}) {
  return useQuery({
    queryKey: QUERY_KEYS.tasks.key,
    queryFn: () => fetchTasks(options),
  });
}

export function useCreateTask() {
  return useMutation({
    mutationFn: createTaskClient,

    // optimistic update
    onMutate: async (taskData, context) => {
      // cancel running update for this query key, to avoid overwrite optimistic update
      await context.client.cancelQueries({ queryKey: QUERY_KEYS.tasks.key });

      // snapshot for rollback
      const prevTasks = context.client.getQueryData<Task[]>(
        QUERY_KEYS.tasks.key,
      );

      const optimisticTask: Task = {
        id: crypto.randomUUID(),
        title: taskData.title,
        status: "todo",
        userId: crypto.randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
        dueDate: null,
        projectId: taskData.projectId,
      };

      // set optimistic update
      context.client.setQueryData(QUERY_KEYS.tasks.key, (old: Task[]) => [
        ...old,
        optimisticTask,
      ]);

      // old data untuk rollback
      return { prevTasks };
    },
    onError: async (error, taskData, onMutateResult, context) => {
      // kalo error, ganti lagi tasks yg optimistic dengan prev tasks
      context.client.setQueryData(
        QUERY_KEYS.tasks.key,
        onMutateResult?.prevTasks,
      );
    },
    onSettled: async (data, error, taskData, onMutateResult, context) => {
      context.client.invalidateQueries({ queryKey: QUERY_KEYS.tasks.key });
    },
  });
}

export function useDeleteTask() {
  return useMutation({
    mutationFn: deleteTaskClient,
    onMutate: async (taskId, context) => {
      // cancel running update for this query key, to avoid overwrite optimistic update
      await context.client.cancelQueries({ queryKey: QUERY_KEYS.tasks.key });

      // snapshot for rollback
      const prevTasks =
        context.client.getQueryData<Task[]>(QUERY_KEYS.tasks.key) || [];

      const optimisticTasks: Task[] = prevTasks?.filter((t) => t.id !== taskId);

      // set optimistic update
      context.client.setQueryData(QUERY_KEYS.tasks.key, optimisticTasks);

      // old data untuk rollback
      return { prevTasks };
    },
    onError(error, variables, onMutateResult, context) {
      // rollback
      context.client.setQueryData(
        QUERY_KEYS.tasks.key,
        onMutateResult?.prevTasks,
      );
    },
    onSettled: async (data, error, taskData, onMutateResult, context) => {
      context.client.invalidateQueries({ queryKey: QUERY_KEYS.tasks.key });
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
    onMutate: async ({ taskId, data }, context) => {
      await context.client.cancelQueries({ queryKey: QUERY_KEYS.tasks.key });

      // snapshot
      const prevTasks =
        context.client.getQueryData<Task[]>(QUERY_KEYS.tasks.key) || [];

      // optimistic
      const newTasks = prevTasks.map((t) => {
        if (t.id === taskId) {
          const newStatus = data.status === "todo" ? "done" : "todo";
          t.status = newStatus;
        }
        return t;
      });

      // set optimistic
      context.client.setQueryData(QUERY_KEYS.tasks.key, newTasks);

      // return snapshot for rollback
      return { prevTasks };
    },
    onError(error, variables, onMutateResult, context) {
      context.client.setQueryData(
        QUERY_KEYS.tasks.key,
        onMutateResult?.prevTasks,
      );
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.tasks.key });
    },
  });
}
