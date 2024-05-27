import status from "http-status";

class InvalidParameterError extends Error {
  private statusCode: number;
  constructor(param: string = "param") {
    super(`Missing or invalid ${param}`);
    this.statusCode = status.BAD_REQUEST;
  }
}

export default InvalidParameterError;
