const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize, errors } = format;
const DailyRotateFile = require('winston-daily-rotate-file');

// Benutzerdefiniertes Log-Format
const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level}]: ${stack || message}`;
});

// Logger erstellen
const logger = createLogger({
    level: 'info', // Standard-Level
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }), // Stack-Traces für Fehler
        logFormat
    ),
    transports: [
        new transports.Console({
            format: combine(
                colorize(), // Farben für die Konsole
                logFormat
            ),
        }),
        new DailyRotateFile({
          filename: 'logs/%DATE%-combined.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d', // Logs für 14 Tage aufbewahren
      }),
      new DailyRotateFile({
          filename: 'logs/%DATE%-error.log',
          level: 'error',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
      }),
    ],
});

// Produktion: Nur File-Logging
if (process.env.NODE_ENV === 'production') {
    logger.add(
        new transports.File({ filename: 'logs/info.log', level: 'info' })
    );
}

module.exports = logger;
