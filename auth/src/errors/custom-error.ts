export abstract class CustomError extends Error {

  abstract statusCode: number;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  // maybe field might have other name, like details or something like that
  abstract serializeErrors(): { message: String; field?: string }[];

} 
