import { useMutation } from "@tanstack/react-query";
import { CreateProjectInput } from "./project.schema";
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
