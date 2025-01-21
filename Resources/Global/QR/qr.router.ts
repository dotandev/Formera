import { Router } from "express";
import { QrService } from "./qr.services";

const qrService = new QrService();


export const qrRouter = Router();

qrRouter.get('/', qrService.saveQRCodeToCloudinary)