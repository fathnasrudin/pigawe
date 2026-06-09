import { NextRequest } from "next/server";
import { errorHandler } from "./error/error-handler";
import { logger } from "./logger";
import { AppError } from "./error/error";

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

export type CustomRouteContext<T = Record<string, string | string[]>> = {
  params: Promise<T>;
};

type RequestLog = {
  url: string;
  method: string;
  statusCode: number;
};

export const routeWrapper = <T>(
  fn: (
    request: NextRequest,
    context: CustomRouteContext<T>,
  ) => Promise<Response> | Response,
) => {
  return async (request: NextRequest, context: CustomRouteContext<T>) => {
    const defaultRequestLog: Pick<RequestLog, "url" | "method"> = {
      url: request.url,
      method: request.method,
    };
    try {
      const response = await fn(request, context);

      // request log
      const requestLog: RequestLog = {
        ...defaultRequestLog,
        statusCode: response.status,
      };
      logger.info(requestLog);

      return response;
    } catch (error) {
      // request log
      const requestLog: RequestLog = {
        ...defaultRequestLog,
        statusCode: error instanceof AppError ? error.statusCode : 500,
      };
      logger.info(requestLog);

      return badApiResponse(error);
    }
  };
};
