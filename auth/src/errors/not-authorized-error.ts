import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError {

  statusCode = 401;
  reason: String = "Not authorized";

  constructor() {
    super("Not authorized");

    // Extending a built in class
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }


  serializeErrors() {
    return [{ "message": this.reason }];
  }



}
