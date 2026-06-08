import { BadResponseData } from "../response";

export class AppError extends Error {
  statusCode: number;
  code: BadResponseData["code"];

  constructor(
    statusCode: number,
    code: BadResponseData["code"],
    message: string,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}

export class NotFoundError extends AppError {
  constructor(code: BadResponseData["code"], message: string) {
    super(404, (code = "NOT_FOUND"), message);
  }
}
