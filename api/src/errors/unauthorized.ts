import status from "http-status";

class UnauthorizedError extends Error {
  private statusCode: number;
  constructor(message: string = "Unauthorized") {
    super(message);
    this.statusCode = status.UNAUTHORIZED;
  }
}

export default UnauthorizedError;
