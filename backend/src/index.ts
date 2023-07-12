import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import { productRouter } from "./routers/productRouter";
import { seedRouter } from "./routers/seedRouter";

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb:://localhost/brecholadb";
mongoose.set("strictQuery", true);
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch(() => {
    console.log("error mongodb");
  });

const app = express();
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);

app.use("/api/products", productRouter);
app.use("/api/seed", seedRouter);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server iniciado em http://localhost:${PORT}`);
});
