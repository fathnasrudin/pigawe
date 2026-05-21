export const ROUTES = {
  home: {
    path: "/app",
  },
  task: {
    today: { path: "/app/today" },
    inbox: { path: "/app/inbox" },
    upcoming: { path: "/app/upcoming" },
    overdue: { path: "/app/overdue" },
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
};
