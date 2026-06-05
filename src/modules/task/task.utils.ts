import { TaskSearchParamsSchema } from "@/modules/task/task.schema";
import { addDays, startOfDay } from "date-fns";
import { TaskFindManyArgs } from "../../../generated/prisma/models";

export function transformTaskSearchParamsToDB(
  tasksFilters?: TaskSearchParamsSchema,
): TaskFindManyArgs {
  const options: TaskFindManyArgs = {};
  if (!tasksFilters) return {};
  const now = new Date();

  options.where = { ...tasksFilters };

  if (tasksFilters.dueDate === "today") {
    options.where.dueDate = {
      gte: startOfDay(now),
      lt: startOfDay(addDays(now, 1)),
    };
  }

  if (tasksFilters.dueDate === "upcoming") {
    options.where.dueDate = {
      gte: startOfDay(now),
    };
  }

  if (tasksFilters.dueDate === "overdue") {
    options.where.dueDate = {
      lt: startOfDay(now),
    };
    options.where.status = "todo";
  }

  return options;
}
