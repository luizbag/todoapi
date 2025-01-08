import { container, serverConfig, Logger } from "./config";
import "dotenv/config";
import { InversifyExpressServer } from "inversify-express-utils";
import "reflect-metadata";

export async function Bootstrap() {
  const server = new InversifyExpressServer(container);
  server.setConfig(serverConfig);
  const port = process.env.PORT || 3000;
  const app = server.build();
  app.listen(port, () => {
    new Logger().info(`Server running at http://localhost:${port}`);
  });
}

Bootstrap();
