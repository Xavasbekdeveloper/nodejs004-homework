import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Users from "./router/user.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("mongodb is connected"))
  .catch(() => console.log("mongodb is not connected"));

app.use("/users", Users);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`${PORT} is running`));
