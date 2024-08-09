import { Logger, Message } from "../../domain/logger";
import { loggerTash } from "./logging";

export class ConsoleLogger implements Logger {
  info(message: Message): void {
    loggerTash.info(message);
  }

  error(message: Message): void {
    loggerTash.error(message);
  }
}
