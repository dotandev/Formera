import config from "./config"
import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'

export interface IRequest extends Request {
    isAuthenticated(): any
    user: any
}

export class Authenticator {
    public isLoggedIn = async (
        req: any,
        res: Response,
        next: NextFunction
    ) => {
        const token = req.header('Authorization')?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        try {
            // Verify the token using your secret key (replace 'yourSecretKey' with your actual secret key)
            const decoded = jwt.verify(token, config.auth.accessTokenSecret) as { userId: string; email: string };

            // Attach user information to the request object
            req.user = decoded
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Token is invalid' });
        }
    }



    public isBusiness = async (
        req: any,
        res: Response,
        next: NextFunction
    ) => {
        if (req.isAuthenticated() && req.user.role === 'business') {
            return next()
        }
        res.status(401).send('You must be a user to access this route')
    }

    public isNotLoggedIn(req: IRequest, res: Response, next: NextFunction) {
        if (!req.isAuthenticated()) {
            return next()
        }
        res.status(401).send('You are already logged in')
    }

    public isAdmin(req: IRequest, res: Response, next: NextFunction) {
        if (req.isAuthenticated() && req.user.role === 'admin') {
            return next()
        }
        res.status(401).send('You must be an admin to access this route')
    }

    public isUser(req: any, res: Response, next: NextFunction) {
        if (req.isAuthenticated() && req.user.role === 'user') {
            return next()
        }
        res.status(401).send('You must be a user to access this route')
    }

    public isOwner(req: IRequest, res: Response, next: NextFunction) {
        if (req.isAuthenticated() && req.user.role === 'owner') {
            return next()
        }
        res.status(401).send('You must be an owner to access this route')
    }

    public isSuperAdmin(req: IRequest, res: Response, next: NextFunction) {
        if (req.isAuthenticated() && req.user.role === 'superadmin') {
            return next()
        }
        res.status(401).send('You must be a super admin to access this route')
    }

    public isSuperAdminOrOwner(req: IRequest, res: Response, next: NextFunction) {
        if (req.isAuthenticated() && (req.user.role === 'superadmin' || req.user.role === 'owner')) {
            return next()
        }
        res.status(401).send('You must be a super admin or owner to access this route')
    }
}
