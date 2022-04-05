import express, {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {BadRequestError} from "../errors/bad-request-error";

const router = express.Router();

router.get('/api/users/currentuser', async (req: Request, res: Response) => {
  const currentJwt = req.session!.jwt;

  if(!currentJwt) {
    res.send({currentUser: {}})
  }

  try {
    const currentUser = jwt.verify(currentJwt, process.env.JWT_KEY!)
    res.send({currentUser})
  } catch (err) {
    res.send({currentUser: {}})
  }

})

export { router as currentUserRouter }
