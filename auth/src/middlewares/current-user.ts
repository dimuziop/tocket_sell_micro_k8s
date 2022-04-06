import {NextFunction, Request, Response} from "express"
import jwt from "jsonwebtoken";

interface UserPayload {
    id: String,
    email: String
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload
        }
    }
}


export const currentUser = (req: Request, res: Response, next: NextFunction) => {
    const currentJwt = req.session!.jwt;

    if(!req.session?.jwt) {
        next();
    }

    try {
        req.currentUser = jwt.verify(currentJwt, process.env.JWT_KEY!) as UserPayload;
    } catch (err) {}
    next();
}
