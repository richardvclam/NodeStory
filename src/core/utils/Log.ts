import winston, { addColors, createLogger, format, transports } from "winston";

addColors(winston.config.syslog.colors);

export const Log = createLogger({
  level: "info",
  levels: winston.config.syslog.levels,
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
    format.colorize(),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
  ),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`.
    // - Write all logs error (and below) to `error.log`.
    //
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/combined.log" }),
    new transports.Console({ level: "debug" }),
  ],
});
