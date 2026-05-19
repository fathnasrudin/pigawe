import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../task.api.client";

export function useFetchTasks() {
  return useQuery({ queryKey: ["tasks"], queryFn: fetchTasks });
}
