import express, { Request, Response } from "express";
import { sampleProducts } from "./data";

const app = express();
app.get("/api/products", (req: Request, res: Response) => {
  res.json(sampleProducts);
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server iniciado em http://localhost:${PORT}`);
});
