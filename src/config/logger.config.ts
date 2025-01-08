import { injectable } from "inversify";
import { format, createLogger, transports } from "winston";

const { colorize, combine, json, label, printf, timestamp } = format;

@injectable()
export class Logger {
  constructor(private readonly loggerLabel: string = "Todo API") {}

  private readonly consoleTransport = new transports.Console({
    format: combine(
      colorize({
        all: true,
        colors: {
          info: "bold blue",
          warn: "italic yellow",
          error: "bold red",
          debug: "green",
        },
      })
    ),
  });
  private readonly debugFileTransport = new transports.File({
    filename: "logs/debug.log",
    format: combine(json()),
  });
  private readonly exceptionFileTransport = new transports.File({
    filename: "logs/exceptions.log",
    format: combine(json()),
  });

  private logger = createLogger({
    level: "debug",
    format: combine(
      label({ label: `[${this.loggerLabel}]` }),
      timestamp({
        format: "MMM-DD-YYYY HH:mm:ss",
      }),
      printf(function (info) {
        return `\x1B[33m\x1B[3[${info.label}\x1B[23m\x1B[39m \x1B[32m${info.timestamp}\x1B[39m ${info.level} : ${info.message}`;
      })
    ),
    transports: [this.consoleTransport, this.debugFileTransport],
    exceptionHandlers: [this.consoleTransport, this.exceptionFileTransport],
  });

  public info(message: any, callback?: void) {
    this.logger.info(message, callback);
  }

  public warn(message: any, callback?: void) {
    this.logger.warn(message, callback);
  }

  public error(message: any, callback?: void) {
    this.logger.error(message, callback);
  }

  public debug(message: any, callback?: void) {
    this.logger.debug(message, callback);
  }
}
