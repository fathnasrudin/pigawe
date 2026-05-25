import { TaskSearchParamsSchema } from "@/features/task/task.schema";

export const QUERY_KEYS = {
  tasks: {
    key: ["tasks"],
    options: {
      buildKey: (options?: { searchParams?: TaskSearchParamsSchema }) => {
        if (options?.searchParams) return ["tasks", options.searchParams];
        return ["tasks"];
      },
    },
  },
  projects: {
    all: ["projects"],
    default: ["projects", { isDefault: true }],
    unique: {
      buildKey: (projectId: string) => ["projects", { id: projectId }],
    },
  },
};
