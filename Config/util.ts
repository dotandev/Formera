export class Utils {
    public async cleanDataOffSensitiveProperties(data: any) {
        if (data) {
            delete data.password;
            delete data.__v;
            delete data.updatedAt;
            delete data.createdAt;
            delete data.passwordResetToken;
            delete data.passwordResetTokenExpires;
            delete data.emailVerificationToken;
            delete data.emailVerificationTokenExpires;
            delete data.twoFactorAuthCode;
            delete data._id;
            delete data.user;
            return data;
        }
        return null
    }
}