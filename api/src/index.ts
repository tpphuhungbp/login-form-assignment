import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import router from "./routes";
import cors from "cors";
import { connectToDb } from "./databases";
import http, { Server } from "http";
import middlewares from "./middlewares";

//For env File
dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8000;

app.set("port", port);

app.use("/api/v1/auth", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.use(middlewares.notFoundMiddleware);
app.use(middlewares.errorHandleMiddleware);

const server: Server = http.createServer(app);

connectToDb();

server
  .listen(port, () => {
    console.log(`Server is listening at port: ${port}`);
  })
  .on("error", (_error: Error) => {
    return console.log("Error: ", _error.message);
  });

server.on("error", (error: NodeJS.ErrnoException) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  // Handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      // eslint-disable-next-line no-console
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      // eslint-disable-next-line no-console
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});
