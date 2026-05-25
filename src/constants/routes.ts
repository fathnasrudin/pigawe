export const ROUTES = {
  home: {
    path: "/app",
  },
  task: {
    today: { path: "/app/today" },
    inbox: { path: "/app/inbox" },
    upcoming: { path: "/app/upcoming" },
    overdue: { path: "/app/overdue" },
    byProject: {
      buildPath: (projectId: string) => `/app/project/${projectId}`,
    },
  },
  auth: {
    path: "/auth",
    signin: {
      path: "/auth/signin",
    },
    signup: {
      path: "/auth/signup",
    },
  },

  // api
  api: {
    me: {
      projects: {
        path: "/api/me/projects",
        id: {
          buildPath: (projectId: string) => `/api/me/projects/${projectId}`,
        },
      },
      defaultProject: {
        path: "/api/me/default-project",
      },
    },
  },
};
