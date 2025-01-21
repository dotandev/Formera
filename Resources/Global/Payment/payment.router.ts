import { Router } from "express";
import { PaymentController } from "./payment.controller";

export const paymentRouter = Router();
const paymentController = new PaymentController()


paymentRouter.post('/initialize', paymentController.initializePayment);
paymentRouter.get('/verify', paymentController.verifyPayment);
