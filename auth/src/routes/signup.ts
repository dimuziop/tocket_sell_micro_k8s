import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();

router.post('/api/users/signup', [
  body('email')
    .isEmail()
    .withMessage("Email must be valid"),
  body('password').trim()
    .isLength({ min: 6, max: 20 })
    .withMessage("Password must be between 6 and 20 chars"),
],
  validateRequest,
  async (req: Request, res: Response) => {
    console.info("Creating a user.....")

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      console.info("Email in use")
      throw new BadRequestError("Try again with another account")
    }

    const user = User.build({ email, password });
    await user.save();

    const userJwt = jwt.sign({
      id: user.id,
      email: user.email
    }, process.env.JWT_KEY!);

    req.session = { jwt: userJwt };

    res.status(201).send(user);
  })

export { router as signUpRouter }
