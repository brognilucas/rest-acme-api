import cors from "cors";
import express from "express";
import { IndexRouter } from "./controllers/v0/index.router";

import bodyParser from "body-parser";
require("dotenv-safe").config({ allowEmptyValues: true });
import connectDB from './config/mongoose-db'
(async () => {
 
  await connectDB(); 

  const app = express();
  const port = process.env.PORT || 8080;

  app.use(bodyParser.json());

  console.log("done");
  app.use(
    cors({
      allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "X-Access-Token",
        "Authorization",
      ],
      methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
      origin: "*",
    })
  );

  app.use("/api/v0/", IndexRouter);

  // Root URI call
  app.get("/", async (req, res) => {
    res.send("/api/v0/");
  });

  app.get("/health", async (req, res) => {
    res.status(200).send("is healthy");
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`press CTRL+C to stop server`);
  });
})();
