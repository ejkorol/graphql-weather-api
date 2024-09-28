export class ApiError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = "Api Error";
  }
}

export class FlightError extends ApiError {
  constructor(message: string = "Flight Error") {
    super(message, 500);
    this.name = "Flight Error";
  }
}

export class UnknownError extends ApiError {
  constructor(message: string = "Unknown Error") {
    super(message, 500);
    this.name = "Unknown Error";
  }
}

export class LocationError extends ApiError {
  constructor(message: string = "Location Error") {
    super(message, 500);
    this.name = "Location Error";
  }
}

export const handleError = (e: unknown, message: string) => {
  switch (e) {
    case e instanceof ApiError:
      console.error(`${message}: ${e}`);
      return e;
    default:
      console.error(`${message}: ${e}`);
      return new UnknownError();
  }
};
