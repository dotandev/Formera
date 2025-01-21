import Joi from "joi";

export class NotificationValidator {
    public async validateNotification (body: any) {
        const schema = Joi.object({
            title: Joi.string().required(),
            message: Joi.string().required(),
            userId: Joi.string().required(),
            read: Joi.boolean().required()
        })
        return schema.validate(body)
    }
}