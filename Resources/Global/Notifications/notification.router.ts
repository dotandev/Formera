import { Router, Request, Response } from "express";
import { NotificationController } from "./notification.controller";
import { Authenticator } from "../../Config/authenticator";

export const notificationRouter = Router()
const notificationController = new NotificationController
const authenticator = new Authenticator



notificationRouter.get('/', (req: Request, res: Response) => {
    return res.status(200).json({
        message: "notification Service Is Live!",
        status: 200
    })
})

notificationRouter.get('/get/:notificationId', authenticator.isLoggedIn, notificationController.GetNotification)
notificationRouter.get('/get', authenticator.isLoggedIn, notificationController.GetAllNotifications)
notificationRouter.patch('/read/:notificationId', authenticator.isLoggedIn, notificationController.MarkNotificationAsRead)
notificationRouter.patch('/read', authenticator.isLoggedIn, notificationController.MarkAllAsRead)
