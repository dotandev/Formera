import { Request, Response } from 'express';
import { AuthService } from './auth.services';
import { AuthValidator } from './auth.validator';
import { UserModel } from './auth.model';
import { Hasher } from '../../Config/hasher';
import { TokenService } from '../../Config/jwt';

const authService = new AuthService();
const authValidator = new AuthValidator();
const hasher = new Hasher();
const tokenService = new TokenService();

export class AuthController {
    public async Register(req: Request, res: Response) {
        try {
            const data = req.body;
            const ValidatedBody = await authValidator.ValidateRegister(data);
            if (ValidatedBody.error) {
                return res.status(400).json({
                    message: ValidatedBody.error.details[0].message,
                    status: 400
                })
            }
            const { email, password } = ValidatedBody.value;
            const user = await authService.FindUserByEmail(email);
            if (user) {
                return res.status(400).json({
                    message: 'User already exists',
                    status: 400
                })
            }
            const hashedPassword = await hasher.HashData(password);
            const otp = await tokenService.generateOTP();
            const otpExpiresInForUser = Date.now() + 600000; // 10 minutes
            const newUser = new UserModel({
                email: data.email,
                password: hashedPassword,
                firstName: data.firstname,
                lastName: data.lastname,
                phone: data.phone,
                otp: otp,
                otpExpiresIn: otpExpiresInForUser
            })
            const savedUser = await newUser.save();
            const userData = {
                email: savedUser.email,
            }
            return res.status(201).json({
                message: 'User registered successfully',
                status: 201,
                data: userData
            })
        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error!",
                status: 500,
                error
            })
        }
    }

    public async Login(req: Request, res: Response) {
        try {
            const data = req.body;
            const ValidatedBody = await authValidator.ValidateLogin(data);
            if (ValidatedBody.error) {
                return res.status(400).json({
                    message: ValidatedBody.error.details[0].message,
                    status: 400
                })
            }
            const { password, email } = req.body;
            const user = await UserModel.findOne({ email: email})
            if (!user) {
                return res.status(400).json({
                    message: 'User not registered',
                    status: 400
                })
            }
            const isMatch = await hasher.CompareHashData(password, user.password);
            if (!isMatch) {
                return res.status(400).json({
                    message: 'Invalid password',
                    status: 400
                })
            }
            const userId = user._id as unknown as string
            const token = await tokenService.generateAccessToken({ userId: userId, email: user.email });
            const userData = {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
            return res.status(200).json({
                message: 'User logged in successfully',
                status: 200,
                data: {
                    token: token,
                    user: userData
                }
            })
        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error!",
                status: 500,
                error
            })
        }
    }

    public async VerifyEmail (req: Request, res: Response) {
        try {
            const data = req.body;
            const ValidatedBody = await authValidator.ValidateVerifyEmail(data);
            if (ValidatedBody.error) {
                return res.status(400).json({
                    message: ValidatedBody.error.details[0].message,
                    status: 400
                })
            }
            const { email, otp } = req.body
            const user = await UserModel.findOne({ email: email })
            if (user?.isEmailVerified === true) {
                return res.status(400).json({
                    message: "Email Is Verified Already!",
                    status: 400
                })
            }
            if (!user) {
                return res.status(404).json({
                    message: "Invalid User",
                    status: 404
                })
            }
            if (user.otp !== otp) {
                return res.status(400).json({
                    message: "Invalid OTP",
                    status: 400
                })
            }
            const expires = new Date(user.otpExpiresIn)
            const now = new Date()
            if (expires < now) {
                return res.status(400).json({
                    message: "OTP Is Expired",
                    status: 400
                })
            }
            user.isEmailVerified = true
            user.otp = ''
            user.otpExpiresIn = new Date()
            await user.save()
            return res.status(200).json({
                message: "Email Verified Successfully",
                status: 200
            })
        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error!",
                status: 500,
                error
            })
        }
    }

    public async ForgotPassword(req: Request, res: Response) {
        try {
            const data = req.body;
            const ValidatedBody = await authValidator.ValidateForgotPassword(data);
            if (ValidatedBody.error) {
                return res.status(400).json({
                    message: ValidatedBody.error.details[0].message,
                    status: 400
                })
            }
            const { email } = req.body
            const user = await UserModel.findOne({ email: email }) as any
            if (!user) {
                return res.status(404).json({
                    message: "Invalid Email!",
                    status: 404
                })
            }
            const otp = await tokenService.generateOTP()
            user.otp = otp
            user.otpExpiresIn = new Date(Date.now() + 600000) // 10 minutes
            await user.save()
            // Send forgot password email
            return res.status(200).json({
                message: "Email To Reset Password is sent!",
                status: 200,
                data: {
                    otp
                }
            })
        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error!",
                status: 500,
                error
            })
        }
    }

    public async VerifyForgotPassword(req: Request, res: Response) {
        try {
            const data = req.body;
            const ValidatedBody = await authValidator.ValidateVerifyEmail(data);
            if (ValidatedBody.error) {
                return res.status(400).json({
                    message: ValidatedBody.error.details[0].message,
                    status: 400
                })
            }
            const { email, otp } = req.body
            const user = await UserModel.findOne({ email: email })
            if (!user) {
                return res.status(404).json({
                    message: "Invalid Email!",
                    status: 404
                })
            }
            if (user.otp !== otp) {
                return res.status(400).json({
                    message: "Invalid OTP",
                    status: 400
                })
            }
            const expires = new Date(user.otpExpiresIn)
            const now = new Date()
            if (expires < now) {
                return res.status(400).json({
                    message: "OTP Is Expired",
                    status: 400
                })
            }
            user.otp = ''
            user.otpExpiresIn = new Date()
            await user.save()
            return res.status(200).json({
                message: "OTP Verified Successfully",
                status: 200,
                data: {
                    email: user.email
                }
            })
        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error!",
                status: 500,
                error
            })
        }
    }

    public async ResetPassword(req: Request, res: Response) {
        try {
            const data = req.body;
            const ValidatedBody = await authValidator.ValidateResetPassword(data);
            if (ValidatedBody.error) {
                return res.status(400).json({
                    message: ValidatedBody.error.details[0].message,
                    status: 400
                })
            }
            const { email, password } = req.body
            const user = await UserModel.findOne({ email: email }) as any
            if (!user) {
                return res.status(404).json({
                    message: "Invalid Email!",
                    status: 404
                })
            }
            const hashedPassword = await hasher.HashData(password);
            user.password = hashedPassword
            await user.save()
            return res.status(200).json({
                message: "Password Reset Successfully",
                status: 200
            })
        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error!",
                status: 500,
                error
            })
        }
    }

    public async ChangePassword(req: any, res: Response) {
        try {
            const userId = req.user.id
            if (!userId) {
                return res.status(400).json({
                    message: "Invalid User",
                    status: 400
                })
            }
            const data = req.body;
            const ValidatedBody = await authValidator.ValidateChangePassword(data);
            if (ValidatedBody.error) {
                return res.status(400).json({
                    message: ValidatedBody.error.details[0].message,
                    status: 400
                })
            }
            const { password, oldPassword } = req.body
            const user = await UserModel.findById(userId) as any
            if (!user) {
                return res.status(404).json({
                    message: "Invalid User",
                    status: 404
                })
            }
            const isMatch = await hasher.CompareHashData(oldPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({
                    message: 'Invalid old password',
                    status: 400
                })
            }
            const hashedPassword = await hasher.HashData(password);
            user.password = hashedPassword
            await user.save()
            return res.status(200).json({
                message: "Password Changed Successfully",
                status: 200
            })
        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error!",
                status: 500,
                error
            })
        }
    }

    public async VerifyAuthenticatorCode(req: any, res: Response) {
        try {
            const userId = req.user.id
            if (!userId) {
                return res.status(400).json({
                    message: "Invalid User",
                    status: 400
                })
            }
            const data = req.body;
            const ValidatedBody = await authValidator.ValidateChangePassword(data);
            if (ValidatedBody.error) {
                return res.status(400).json({
                    message: ValidatedBody.error.details[0].message,
                    status: 400
                })
            }
            const { password, oldPassword } = req.body
            const user = await UserModel.findById(userId) as any
            if (!user) {
                return res.status(404).json({
                    message: "Invalid User",
                    status: 404
                })
            }
            const isMatch = await hasher.CompareHashData(oldPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({
                    message: 'Invalid old password',
                    status: 400
                })
            }
            const hashedPassword = await hasher.HashData(password);
            user.password = hashedPassword
            await user.save()
            return res.status(200).json({
                message: "Password Changed Successfully",
                status: 200
            })
        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error!",
                status: 500,
                error
            })
        }
    }
}