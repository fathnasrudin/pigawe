export type BadResponseData = (
  | { code: "INTERNAL_SERVER_ERROR" | "UNAUTHORIZED" }
  | {
      code: "VALIDATION_ERROR";
    }
) & { message: string };
export type BadResponse = { success: false; error: BadResponseData };

export type GoodResponse<T> = { success: true; data: T };
export type ApiResponse<T> = GoodResponse<T> | BadResponse;
