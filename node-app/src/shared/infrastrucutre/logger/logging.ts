import winston from "winston";
import { LogstashTransport } from "winston-logstash-ts";
import { config } from "../config";

const { host, port } = config.logs;
export const loggerTash = LogstashTransport.createLogger("node-app", {
  host: host,
  port: port,
  protocol: "udp",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.logstash()
  ),
});
loggerTash.add(
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  })
);
