import { Router } from 'express';
import { AuthController } from './auth.controller';
import { Authenticator } from '../../Config/authenticator';
import { Request, Response } from 'express';

export const authRouter = Router();
const authController = new AuthController();
const authenticator = new Authenticator();

authRouter.get('/ping', (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome To The Nodes"
    })
});

authRouter.post('/register', authController.Register);
authRouter.post('/login', authController.Login);
authRouter.post('/verify/email', authController.VerifyEmail);
authRouter.post('/forgot/password', authController.ForgotPassword);
authRouter.post('/reset/password', authController.ResetPassword);
authRouter.post('/change/password', authController.ChangePassword);
authRouter.post('/verify/forgot', authController.VerifyForgotPassword);