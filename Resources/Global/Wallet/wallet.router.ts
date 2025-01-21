import { Router } from "express";
import { Authenticator } from "../../Config/authenticator";
import { WalletController } from "./wallet.controller";

const authenticator = new Authenticator()
const walletController = new WalletController()

export const walletRouter: Router = Router();


walletRouter.get('/', (req, res) => {
  res.send('Welcome to the Wallet Service!');
});


walletRouter.get("/details", authenticator.isLoggedIn, walletController.GetWalletDetails)
walletRouter.post("/create", authenticator.isLoggedIn, walletController.CreateWallet)
walletRouter.post("/fund", authenticator.isLoggedIn, walletController.FundWallet)
walletRouter.get("/balance", authenticator.isLoggedIn, walletController.GetWalletBalance)
