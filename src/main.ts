import { container, serverConfig, Logger, serverErrorConfig } from "./config";
import "dotenv/config";
import { InversifyExpressServer } from "inversify-express-utils";
import "reflect-metadata";

export async function Bootstrap() {
  const server = new InversifyExpressServer(container);
  server.setConfig(serverConfig);
  server.setErrorConfig(serverErrorConfig);
  const app = server.build();
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    new Logger().info(`Server running at http://localhost:${port}`);
  });
}

Bootstrap();
