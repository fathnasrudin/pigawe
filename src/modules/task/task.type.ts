export type ITask = {
  id: string;
  title: string;
  status: "done" | "todo";
};

export type ITaskInput = {
  title: string;
};
