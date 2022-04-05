import { CustomError } from "./custom-error";

export class BadCredentialsError extends CustomError {

  statusCode = 401;
  reason: String = "Bad Credentials, please try again";

  constructor() {
    super("Bad Credentials, please try again");

    // Extending a built in class
    Object.setPrototypeOf(this, BadCredentialsError.prototype);
  }


  serializeErrors() {
    return [{ "message": this.reason }];
  }



}
