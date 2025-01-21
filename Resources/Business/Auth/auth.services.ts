import { UserModel } from "./auth.model";

export class AuthService {
    public async FindUserByEmail(email: string) {
        try {
            const user = await UserModel.findOne({ email });
            if (!user) {
                return
            }
            return user
        } catch (error) {
            return error
        }
    }

    public async FindUserById(id: string) {
        try {
            const user = await UserModel.findById(id);
            if (!user) {
                return
            }
            return user
        } catch (error) {
            return error
        }
    }

    public async FindUserByEmailAndOTP(email: string, otp: string) {
        try {
            const user = await UserModel.findOne({ email: email, otp: otp });
            if (!user) {
                return
            }
            return user
        } catch (error) {
            return error
        }
    }
}