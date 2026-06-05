import { TaskSearchParamsSchema } from "@/modules/task/task.schema";

export const QUERY_KEYS = {
  tasks: {
    all: ["tasks"] as const,
    lists: () => [...QUERY_KEYS.tasks.all, "list"] as const,
    list: (options?: { searchParams?: TaskSearchParamsSchema }) => {
      if (options?.searchParams && Object.keys(options.searchParams).length)
        return [...QUERY_KEYS.tasks.lists(), options.searchParams];
      return [...QUERY_KEYS.tasks.lists()];
    },
    details: () => [...QUERY_KEYS.tasks.all, "detail"] as const,
    detail: (id: number) => [...QUERY_KEYS.tasks.details(), id] as const,
  },
  projects: {
    all: ["projects"],
    default: ["projects", { isDefault: true }],
    unique: {
      buildKey: (projectId: string) => ["projects", { id: projectId }],
    },
  },
};
