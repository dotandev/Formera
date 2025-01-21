import { INotification } from "./notification.interface";
import { Notification } from "./notification.model";

export class NotificationService {
    public async CreateANotification (data: INotification) {
        try {
            const notification = new Notification({
                title: data.title,
                message: data.message,
                user: data.user
            });
            await notification.save();
            return notification;
        } catch (error) {
            return error;
        }
    }
}

const notificationService = new NotificationService();

export async function run () {
    // const donee = await notificationService.CreateANotification({ title: "New Notification", message: "You have a new notification", user: "662bf7d678c1adc6d1930d6d" })
    // console.log(donee)
}

