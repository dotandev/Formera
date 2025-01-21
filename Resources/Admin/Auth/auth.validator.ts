import Joi from 'joi';


export class AuthValidator {
    public async ValidateLogin(data: any) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required()
        });
        return schema.validate(data);
    }

    public async ValidateRegister(data: any) {
        const schema = Joi.object({
            firstname: Joi.string().required(),
            lastname: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            phone: Joi.string().required()
        });
        return schema.validate(data);
    }

    public async ValidateVerifyEmail(data: any) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            otp: Joi.string().min(6).required()
        })
        return schema.validate(data)
    }

    public async ValidateForgotPassword(data: any) {
        const schema = Joi.object({
            email: Joi.string().email().required()
        });
        return schema.validate(data);
    }

    public async ValidateResetPassword(data: any) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });
        return schema.validate(data);
    }

    public async ValidateChangePassword(data: any) {
        const schema = Joi.object({
            password: Joi.string().required(),
            oldPassword: Joi.string().required()
        });
        return schema.validate(data);
    }
}