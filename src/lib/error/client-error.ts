import { BadResponseData } from "../response";

export class ClientFetchError extends Error {
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
