import express, {Request, Response} from 'express';
import {body} from "express-validator";
import {User} from "../models/user";
import {validateRequest} from "../middlewares/validate-request";
import {BadCredentialsError} from "../errors/bad-credentials-error";
import jwt from "jsonwebtoken";
import {Password} from "../services/password";

const router = express.Router();

router.post('/api/users/signin', [
        body('email')
            .isEmail()
            .withMessage("Email must be valid"),
        body('password').trim().notEmpty()
            .withMessage("Password must be present"),
    ],
    validateRequest,
    async (req: Request, res: Response) => {

        const {email, password} = req.body;
        const user = await User.findOne({email})

        if(!user || !(await Password.check(user.password, password))) {
            throw new BadCredentialsError()
        }

        const userJwt = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_KEY!);

        req.session = {jwt: userJwt};

        res.status(201).send(user);
    })

export {router as signInRouter}
