interface ILogger {
  info(message: string): void;
  error(message: string): void;
  warn(message: string): void;
  debug(message: string): void;
}

const ProductionLogger: ILogger = {
  error(message: string): void {
    console.error(message);
  },
  warn(message: string): void {
    console.warn(message);
  },
  info(message: string): void {},
  debug(message: string): void {},
};

const DevelopmentLogger: ILogger = {
  info(message: string): void {
    console.info(message);
  },
  error(message: string): void {
    console.error(message);
  },
  warn(message: string): void {
    console.warn(message);
  },
  debug(message: string): void {
    console.debug(message);
  },
};

export function createlogger(): ILogger {
  if (process.env.NODE_ENV === "production") {
    return ProductionLogger;
  } else {
    return DevelopmentLogger;
  }
}
