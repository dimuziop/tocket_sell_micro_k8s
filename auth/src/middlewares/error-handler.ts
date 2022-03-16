import { Request, Response, NextFunction } from "express"
import { CustomError } from "../errors/custom-error";


export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

  // just minimum changes | instance of is baaaaaad stuff
  // if (err instanceof CustomError) {
  //   return res.status(err.statusCode).send({ errors: err.serializeErrors });
  // }

  // if (err instanceof DatabaseConnectionError) {
  //   return res.status(err.statusCode).send({ errors: err.serializeErrors });
  // }

  // Now is corrects cause only differentiate a SINGLE [and ALWAYS SINGLE custom specific abstract class that all error should inherit]

  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors });
  }

  res.status(400).send({
    errors: [{ "message": "Something went so bad" }]
  });

}
