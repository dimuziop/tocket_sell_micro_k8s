export class DatabaseConnectionError extends Error {

  statusCode = 500;
  reason: String = "Error connecting to database";

  constructor() {
    super();

    // Extending a built in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }


  serializeErrors() {
    return [{ "message": this.reason }];
  }



}
