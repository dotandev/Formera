import * as dotenv from "dotenv";
import { ENVIRONMENT } from "./environment";

dotenv.config();

export const config = Object.freeze({
  app: {
    port: parseInt(process.env.PORT!),
    bases: {
      PaymentBaseUrl: process.env.PAYMENT_BASE_URL as string,
      PaymentSecretKey: process.env.PAYMENT_SECRET_KEY as string,
    },
    environment: {
      mode: process.env.NODE_ENV,
      isInProduction: process.env.NODE_ENV === ENVIRONMENT.PROD,
      isInDevelopment: process.env.NODE_ENV === ENVIRONMENT.DEV,
      isInTesting: process.env.NODE_ENV === ENVIRONMENT.TEST,
    },
    blacklist: {
      ID: process.env.BLACKLIST_ID as string,
    },
  },
  mail: {
    globalFrom: process.env.MAIL_FROM as string,
    globalPassword: process.env.MAIL_PASSWORD as string,
    smtpHost: "smtp.gmail.com",
    smtpPort: 465,
    smtpUsername: process.env.USER_EMAIL,
    smtpClientId: process.env.CLIENT_ID as string,
    smtpClientSecret: process.env.CLIENT_SECRET as string,
    smtpRefreshToken: process.env.REFRESH_TOKEN as string,
  },
  auth: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET as string,
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_SECRET_LIFE_SPAN as string,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET as string,
    refreshTokenExpiresIn: process.env.ACCESS_TOKEN_SECRET_LIFE_SPAN as string,
    resetPasswordTokenSecret: process.env.RESET_PASSWORD_TOKEN_SECRET as string,
    resetPasswordTokenExpiresIn: process.env.RESET_PASSWORD_TOKEN_SECRET_LIFE_SPAN as string,
    BankToken: process.env.PAYMENT_SECRET_KEY as string,
  },
  cache: {
    port: parseInt(process.env.REDIS_PORT!),
    host: process.env.REDIS_HOST,
    ttl: parseInt(process.env.REDIS_TTL!),
  },
  ai: {
    gemini: {
      apiKey: process.env.GEMINI_KEY as string,
      apiSecret: process.env.GEMINI_API_SECRET as string,
    },
  },
  db: {
    mongodb: {
      MONGO_URL: process.env.MONGODB_URL as string,
    },
    postgresql: {
      POSTGRESQL_USER: process.env.POSTGRESQL_USER as string,
      POSTGRESQL_USER_PASSWORD: process.env.POSTGRESQL_USER_PASSWORD as string,
      POSTGRESQL_DATABASE: process.env.POSTGRESQL_DATABASE as string,
      POSTGRESQL_PORT: parseInt(process.env.POSTGRESQL_PORT!),
    },
    cloudinary: {
      CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
      CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
      CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string,
    },
  },
  baseLink: process.env.BASE_URL as string,
  rateLimit: {
    limit: process.env.WINDOW_RATE_LIMIT,
  },
  superAdmin: {
    email: process.env.SUPER_ADMIN_EMAIL as string,
    username: process.env.SUPER_ADMIN_USERNAME as string,
    password: process.env.SUPER_ADMIN_PASSWORD as string
  },
  keys: {
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY as string,
  },
});

export enum Roles {
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export default config;