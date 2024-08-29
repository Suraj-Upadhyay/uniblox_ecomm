import Express, { Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

dotenv.config();

const port = process.env.PORT;

const app = Express();

app.use(morgan("tiny"));
app.use(cors());

app.get("/", (_: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log("Server running on port: ", port);
});
