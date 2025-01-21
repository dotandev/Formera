import jwt from 'jsonwebtoken';
import config from './config';

interface IPayload {
    userId: string;
    email: string;
}

export class TokenService {
    public async generateAccessToken(payload: IPayload) {
        try {
            const token = jwt.sign(payload, config.auth.accessTokenSecret, { expiresIn: config.auth.accessTokenExpiresIn });
            return token
        } catch (error) {
            return error
        }
    }

    public async verifyAccessToken(token: string) {
        try {
            const decoded = jwt.verify(token, config.auth.accessTokenSecret);
            return decoded
        } catch (error) {
            return error
        }
    }

    public async generateOTP() {
        try {
            const otp = Math.floor(100000 + Math.random() * 900000);
            return otp
        } catch (error) {
            return error
        }
    }

    public async generateRandomCommunityID() {
        try {
            const Id = Math.floor(100000 + Math.random() * 900000);
            return Id
        } catch (error) {
            return error
        }
    }
}