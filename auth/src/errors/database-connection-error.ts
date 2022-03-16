import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {

  statusCode = 500;
  reason: String = "Error connecting to database";

  constructor() {
    super("DB error");

    // Extending a built in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }


  serializeErrors() {
    return [{ "message": this.reason }];
  }



}
