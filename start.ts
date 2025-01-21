import express, { Express, NextFunction, Request, Response, Router } from 'express';
import cors from 'cors'
import { connectToDB } from './database';
import config from './Config/config';
import { authRouter } from './Resources/Event/Auth/auth.router';
import { Cors } from './Config/cors';


// const qrService = new QrService();

// qrService.generateQRCode('https://musvent.com').then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.log(err);
// })

export const MusventEngine: Express = express();
const musventEngineCors = new Cors;

export const GlobalRouter = Router

MusventEngine.use(express.json());
MusventEngine.use(express.urlencoded({ extended: true }));
MusventEngine.use(cors(musventEngineCors.corsOptions))

MusventEngine.use('/api/v1/accounts/auth', authRouter)


MusventEngine.use((req: Request, res: Response, next: NextFunction) => {
    return res.status(404).json({ message: 'This Request does not sit with MUSVENT API' });
})

MusventEngine.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

connectToDB();
MusventEngine.listen(config.app.port, () => {
    console.log(`Server started on port ${config.app.port}`);
})


