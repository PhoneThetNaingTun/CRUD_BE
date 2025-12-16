import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { mainRoute } from "./routes/main.route";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

app.use(cookieParser());

app.use("/api", mainRoute);

app.listen(5000, () => console.log("Server is running on port 5000"));
