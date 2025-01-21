import { Response, Request } from "express";
import walletModel from "./wallet.model";
import { StatusCodes } from "http-status-codes";

export class WalletController {
    public async GetWalletDetails(req: any, res: Response) {
        try {

        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error",
                status: 500,
                error
            })
        }
    }

    public async FundWallet(req: any, res: Response) {
        try {

        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error",
                status: 500,
                error
            })
        }
    }

    public async GetWalletBalance(req: any, res: Response) {
        try {
            const userId = req.user.id
            const wallet = await walletModel.findOne({ user: userId })
            if (!wallet) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: "Cannot find a wallet for this user!",
                    status: StatusCodes.NOT_FOUND
                })
            }
            const balance = wallet.balance
            return res.status(StatusCodes.OK).json({
                message: "Wallet Balance fetched successfully for user.",
                status: StatusCodes.OK,
                balance
            })
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Internal Server Error",
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                error
            })
        }
    }

    public async CreateWallet(req: any, res: Response) {
        try {
            const userId = req.user.id
            const wallet = new walletModel({
                user: userId, 
            })
            await wallet.save()
            return res.status(StatusCodes.OK).json({
                message: "Wallet Created Successfully!",
                status: StatusCodes.OK
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