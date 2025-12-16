import cors from "cors";
import express from "express";
import { mainRoute } from "./routes/main.route";
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api", mainRoute);

app.listen(5000, () => console.log("Server is running on port 5000"));
