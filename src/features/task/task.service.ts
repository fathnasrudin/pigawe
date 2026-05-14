import { ITask, ITaskInput } from "./task.type";

const generateId = () => crypto.randomUUID();

let tasks: ITask[] = [
  {
    id: generateId(),
    title: "Makan siang",
    status: "todo",
  },
  {
    id: generateId(),
    title: "Makan malam",
    status: "todo",
  },
];

export const getTasks = async () => tasks;

export const createTask = async (taskData: ITaskInput) => {
  const newTask: ITask = {
    id: generateId(),
    title: taskData.title,
    status: "todo",
  };

  tasks.push(newTask);
};

export const deleteTask = async (taskId: string) => {
  tasks = tasks.filter((t) => t.id !== taskId);
};
