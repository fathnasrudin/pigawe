export type BadResponseData = (
  | {
      code:
        | "INTERNAL_SERVER_ERROR"
        | "UNAUTHORIZED"
        | "NOT_FOUND"
        | "PROJECT_NOT_FOUND";
    }
  | {
      code: "VALIDATION_ERROR";
    }
) & { message: string };
export type BadResponse = { success: false; error: BadResponseData };

type ListDataGoodResponse<T> = {
  data: T[];
};

type SingleDataGoodResponse<T> = {
  data: T;
};
export type GoodResponse<T = ListDataGoodResponse | SingleDataGoodResponse> = {
  success: true;
  data: T;
};
export type ApiResponse<T> = GoodResponse<T> | BadResponse;
