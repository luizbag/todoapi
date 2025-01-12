export class BaseException extends Error {
  public type: string;
  public statusCode: number;
  public message: string;

  constructor(type: string, statusCode: number, message: string) {
    super(message);
    this.type = type;
    this.statusCode = statusCode;
    this.message = message;
  }
}

export class InternalServerException extends BaseException {
  constructor(message: string) {
    super("Internal Server Error", 500, message);
  }
}

export class BadRequestException extends BaseException {
  constructor(message: string) {
    super("Bad Request", 400, message);
  }
}

export class ValidationException extends BaseException {
  constructor(message: string) {
    super("Validation Error", 400, message);
  }
}

export class NotFoundException extends BaseException {
  constructor(message: string) {
    super("Not Found Error", 404, message);
  }
}
