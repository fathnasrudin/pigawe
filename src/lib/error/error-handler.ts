import { ZodError } from "zod";
import type { BadResponse } from "../response";
import { AppError } from "./error";
import { ClientFetchError } from "./client-error";

function normalizeErrorResponse(error: unknown): {
  response: BadResponse;
  statusCode: number;
} {
  // validation error
  if (error instanceof ZodError) {
    return {
      statusCode: 400,
      response: {
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: error.message,
        },
      },
    };
  }

  if (error instanceof AppError) {
    return {
      statusCode: error.statusCode,
      response: {
        success: false,
        error: { code: error.code, message: error.message },
      },
    };
  }

  return {
    response: {
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal Server Error",
      },
    },
    statusCode: 500,
  };
}

export function errorHandler(error: unknown) {
  const { response, statusCode } = normalizeErrorResponse(error);
  return Response.json(response, {
    status: statusCode,
  });
}

export function clientErrorHandler(error: unknown) {
  if (error instanceof ClientFetchError) {
    console.error("ClientFetchError", error);
  }

  if (error instanceof Error) {
    console.error(error);
    return;
  }
}
