export const QUERY_KEYS = {
  tasks: {
    key: ["tasks"],
  },
  projects: {
    all: ["projects"],
    default: ["projects", { isDefault: true }],
    unique: {
      buildKey: (projectId: string) => ["projects", { id: projectId }],
    },
  },
};
