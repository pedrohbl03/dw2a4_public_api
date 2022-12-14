import * as dotenv from "dotenv";

import { IConfig } from "../interfaces/Config";

// Load env vars
dotenv.config({ path: `${__dirname} + '/.env` });

export const config: IConfig = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT,
  mongodb_url: process.env.MONGODB_URL || "mongodb://localhost:27017",
  jwt: {
    secret: process.env.JWT_SECRET || "secret",
    accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: process.env.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes:
      process.env.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes:
      process.env.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  email: {
    smtp: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    },
    from: process.env.EMAIL_FROM,
  },
};
