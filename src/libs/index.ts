import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { injectable } from "inversify";

@injectable()
export class AppOrm {
  private _client = new PrismaClient();

  getClient(): PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs> {
    return this._client;
  }
}
