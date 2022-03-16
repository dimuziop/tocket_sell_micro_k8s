import { Request, Response, NextFunction } from "express"
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';


export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

  // just minimum changes | instance of is baaaaaad stuff

  if (err instanceof RequestValidationError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors });
  }

  if (err instanceof RequestValidationError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors });
  }

  res.status(400).send({
    errors: [{ "message": "Something went so bad" }]
  });

}
