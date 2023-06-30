import express, { Request, Response } from "express";
import { sampleProducts } from "./data";
import cors from "cors";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);
app.get("/api/products", (req: Request, res: Response) => {
  res.json(sampleProducts);
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server iniciado em http://localhost:${PORT}`);
});
