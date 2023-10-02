import express from "express";

export const keyRouter = express.Router();

keyRouter.get("/paypal", (req, res) => {
  res.json({
    clientId:
      process.env.PAYPAL_CLIENT_ID ||
      "AUmEHf3ybKvzCVrgFHdfPrjL4hSk8Fgd11qErji8txH7IjINcSviVThNRSFNbuQ8wFK30H4YVVfoTMOQ",
  });
});
