import dotenv from "dotenv";
dotenv.config();

const ACCESS_SECRET = process.env.ACCESS_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;
const FIREBASE_ADMIN_CREDENTIALS = process.env.FIREBASE_ADMIN_CREDENTIALS!;

export const config = {
  ACCESS_SECRET,
  REFRESH_SECRET,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  FIREBASE_ADMIN_CREDENTIALS,
};
