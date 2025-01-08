import { Application, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import { BaseException, InternalServerException } from "./exception.config";

export async function serverConfig(app: Application) {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
}

export function serverErrorConfig(app: Application) {
  app.use(
    (err: Error, req: Request, res: Response, next: NextFunction): any => {
      if (err && err instanceof BaseException) {
        return res.status(err.statusCode).json({
          type: err.type,
          message: err.message,
        });
      }
      if (err)
        return res.status(500).json(new InternalServerException(err.message));

      next();
    }
  );
}
