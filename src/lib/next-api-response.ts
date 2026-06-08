import { errorHandler } from "./error/error-handler";

type Options = {
  status?: number;
};

export function goodApiResponse<T = void>(data: T, options?: Options) {
  const opts = options || {};
  if (!options || !options.status) opts.status = 200;
  return Response.json(data, { status: opts.status });
}

export function badApiResponse(error: unknown) {
  return errorHandler(error);
}
