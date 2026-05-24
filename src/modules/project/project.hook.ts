import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateProjectInput, getProjectsSchema } from "./project.schema";
import { QUERY_KEYS } from "@/constants/query-keys";

export function useCreateProject() {
  return useMutation({
    mutationFn: async ({ data }: { data: CreateProjectInput }) => {
      // network call
      const response = await fetch("/api/projects", {
        method: "post",
        body: JSON.stringify(data),
      });

      // should handle error
      if (!response.ok) {
        throw new Error("Something when wrong in the server?");
      }
    },
    onSettled(data, error, variables, onMutateResult, context) {
      context.client.invalidateQueries({ queryKey: QUERY_KEYS.projects.all });
    },
  });
}

export function useFetchProjects() {
  return useQuery({
    queryKey: QUERY_KEYS.projects.all,
    queryFn: async () => {
      // network call
      const response = await fetch("/api/projects", {
        method: "get",
      });

      // should handle error
      if (!response.ok) {
        throw new Error("Something when wrong in the server?");
      }

      // type result manual, next with zod validation
      const result: { success: true; data: unknown } = await response.json();
      const projects = getProjectsSchema.parse(result.data);

      return projects;
    },
  });
}
