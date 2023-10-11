import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import student from "./router/studentRouter";
import bag from "./router/bagRouter";
import fee from "./router/feeRouter";
import morgan from "morgan";
import dotenv from "dotenv"
dotenv.config()

const mongoURL: string = process.env.MONGO_URL!;
const port: number = parseInt(process.env.PORT!);

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use("/api", student);
app.use("/api", bag);
app.use("/api", fee);
app.use(morgan("dev"));

app.listen(process.env.PORT || port, () => {
  mongoose.connect(mongoURL).then(() => {
    console.log(`My MongoDB database is connected ${mongoose.connection.host}`);
  });
});
