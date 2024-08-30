import Express, { Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

import router from "./router";

dotenv.config();

const port = process.env.PORT;

const app = Express();

app.use(morgan("tiny"));
app.use(cors());
app.use(Express.json());

app.use(router);

app.get("/", (_: Request, res: Response) => {
  res.send("Uniblox Assignment");
});

app.listen(port, () => {
  console.log("Server running on port: ", port);
});
