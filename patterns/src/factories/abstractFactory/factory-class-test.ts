import { LoggerFactory } from "./abstract-factory";

const logger = LoggerFactory.createlogger();

logger.debug("debug message");
logger.warn("warn message");
logger.info("info message");
logger.error("error message");
