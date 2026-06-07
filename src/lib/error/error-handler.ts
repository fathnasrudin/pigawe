type BadResponse = {
  message: string;
  statusText: string;
  errors?: Record<string, string[]>;
};

export function errorHandler(error: unknown) {
  if (error instanceof Error) {
    const response: BadResponse = {
      statusText: "INTERNAL_SERVER_ERROR",
      message: error.message,
    };
    const statusCode = 500;
    return Response.json(response, { status: statusCode });
  }

  const response: BadResponse = {
    statusText: "INTERNAL_SERVER_ERROR",
    message: "Internal server error",
  };
  const statusCode = 500;
  return Response.json(response, { status: statusCode });
}

export function clientErrorHandler(error: unknown) {
  if (error instanceof Error) {
    console.error("Global Error Handler: ", error.message);
    return;
  }
  // if error instanceof ApiError handle switch case based on code

  return console.error("Something went wrong. Refresh the app");
}
