import { Request, Response } from "express";
import { Notification } from "./notification.model";

export class NotificationController {
    public async MarkNotificationAsRead (req: Request, res: Response) {
        try {
            const { notificationId } = req.params
            const notification = await Notification.findById(notificationId)
            if (!notification) {
                return res.status(404).json({
                    status: 404,
                    message: "Notification not found!"
                })
            }
            notification.read = true
            await notification.save()
            return res.status(200).json({
                status: 200,
                message: "Notification marked as read!"
            })
        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error",
                status: 500,
                error
            })
        }
    }
    public async MarkAllAsRead (req: any, res: Response) {
        try {
            const { userId } = req.user
            const notifications = await Notification.find({ user: userId })
            if (!notifications || notifications.length === 0) {
                return res.status(404).json({
                    status: 404,
                    message: "No notifications found!"
                })
            }
            notifications.forEach(async (notification) => {
                notification.read = true
                await notification.save()
            })
            return res.status(200).json({
                status: 200,
                message: "All notifications marked as read!"
            })
        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error",
                status: 500,
                error
            })
        }
    }
    public async GetNotification (req: Request, res: Response) {
        try {
            const { notificationId } = req.params
            const notification = await Notification.findById(notificationId)
            if (!notification) {
                return res.status(404).json({
                    status: 404,
                    message: "Notification not found!"
                })
            }
            return res.status(200).json({
                status: 200,
                message: "Notification Fetched Successfully!",
                data: notification
            })
        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error",
                status: 500,
                error
            })
        }
    }
    public async GetAllNotifications (req: Request, res: Response) {
        try {
            const { userId } = req.body
            const notifications = await Notification.find({ userId: userId })
            if (!notifications || notifications.length === 0) {
                return res.status(404).json({
                    status: 404,
                    message: "No notifications found!"
                })
            }
            return res.status(200).json({
                status: 200,
                message: "Notifications Fetched Successfully!",
                data: notifications
            })
        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error",
                status: 500,
                error
            })
        }
    }
}