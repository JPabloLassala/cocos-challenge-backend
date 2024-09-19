import { Logger } from "@nestjs/common";
import * as morgan from "morgan";

export const successMorgan = morgan(":status | :method | :url | :response-time ms", {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message: string) => Logger.log(message.trim()) },
});

export const errorMorgan = morgan(":status | :method | :url | :response-time ms", {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: (message: string) => Logger.error(message.trim()) },
});
