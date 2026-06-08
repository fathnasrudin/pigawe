import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CreateProjectInput,
  getProjectsSchema,
  Project,
  projectSchema,
} from "./project.schema";
import { QUERY_KEYS } from "@/constants/query-keys";
import { ROUTES } from "@/constants/routes";
import { ClientFetchError } from "@/lib/error/client-error";
import {
  ApiResponse,
  ListDataGoodResponse,
  SingleDataGoodResponse,
} from "@/lib/response";

export function useCreateProject() {
  return useMutation({
    mutationFn: async ({ data }: { data: CreateProjectInput }) => {
      // network call
      const response = await fetch(ROUTES.api.me.projects.path, {
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

export async function fetchProjects() {
  // network call
  const response = await fetch(ROUTES.api.me.projects.path, {
    method: "get",
  });
  const body: ApiResponse<ListDataGoodResponse<Project>> =
    await response.json();

  // should handle error
  if (!body.success) {
    throw new ClientFetchError(
      response.status,
      body.error.code,
      body.error.message,
    );
  }

  // type result manual, next with zod validation
  const result: { success: true; data: unknown } = await body;
  const projects = getProjectsSchema.parse(result.data);

  return projects;
}

export function useFetchProjects() {
  return useQuery({
    queryKey: QUERY_KEYS.projects.all,
    queryFn: fetchProjects,
  });
}

export function useFetchProjectById(projectId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.projects.unique.buildKey(projectId),
    queryFn: async () => {
      // network call
      const response = await fetch(
        ROUTES.api.me.projects.id.buildPath(projectId),
        {
          method: "get",
        },
      );

      const body: ApiResponse<SingleDataGoodResponse<Project>> =
        await response.json();

      // should handle error
      if (!body.success) {
        throw new ClientFetchError(
          response.status,
          body.error.code,
          body.error.message,
        );
      }

      // type result manual, next with zod validation
      const result = body;
      return projectSchema.parse(result.data);
    },
  });
}

export function useFetchDefaultProject() {
  return useQuery({
    queryKey: QUERY_KEYS.projects.default,
    queryFn: async () => {
      // network call
      const response = await fetch(ROUTES.api.me.defaultProject.path, {
        method: "get",
      });

      // should handle error
      if (!response.ok) {
        throw new Error("Something when wrong in the server?");
      }

      // type result manual, next with zod validation
      const result: { success: true; data: unknown } = await response.json();
      const project = projectSchema.parse(result.data);

      return project;
    },
  });
}
