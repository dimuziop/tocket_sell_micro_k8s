import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {

  statusCode = 400;

  constructor(private errors: ValidationError[]) {
    super("Request Validation Error");

    // Extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }


  serializeErrors() {
    return this.errors.map(error => {
      return { message: error.msg, field: error.param }
    });
  }
}