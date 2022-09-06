import {format, transports} from 'winston';
import winston from 'winston';


const { combine, timestamp, label, printf, prettyPrint } = format;

const options: winston.LoggerOptions = {
    transports: [
        new winston.transports.Console({
            level: "debug",
            format: combine(
                timestamp({
                  format: "MMM-DD-YYYY HH:mm:ss",
                }),
                prettyPrint()
              ),
            }),
        new winston.transports.File(
            {
                filename: 'debug.log', 
                level: "debug",
                format: combine(
                    timestamp({
                      format: "MMM-DD-YYYY HH:mm:ss",
                    }),
                  ),
            }
        )
    ]
};

const logger = winston.createLogger(options);

logger.debug("Logging initialized at debug level");

export default logger;