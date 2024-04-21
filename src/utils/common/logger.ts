import winston from 'winston';
import database from '../../config/db';
const Logger = database.logger;
import { format } from 'winston';
import TransportStream = require('winston-transport');

// Define custom Winston transport
class SequelizeTransport extends TransportStream {
  level: any;
  jsonFormatter: winston.Logform.Format;
  constructor(opts) {
    super(opts);
    this.level = opts.level || 'info';
    this.jsonFormatter = format.json(); // Using winston.format.json() for JSON formatting
  }
  log(info, callback) {
    const { level, message, location, meta } = info;

    // Apply JSON formatting to the log message
    const formattedInfo = this.jsonFormatter.transform(info, {
      level,
      message,
      location,
      meta,
    });

    // Check if formattedInfo is an object and not a boolean
    if (formattedInfo && typeof formattedInfo === 'object') {
      // Stringify the meta object
      const serializedMeta = JSON.stringify(formattedInfo.meta);

      Logger.create(
        {
          level,
          message: formattedInfo.message,
          meta: serializedMeta, // Assign the serialized meta
          location,
        },
        { raw: true },
      ) // Use raw: true option to bypass Sequelize's validation
        .then(() => callback())
        .catch(callback);
    } else {
      // Call the callback immediately if formattedInfo is not an object
      callback();
    }
  }
}

// Create Winston logger instance
const logger = winston.createLogger({
  transports: [
    new SequelizeTransport({ level: 'info' }), // Pass any options required by the custom transport
  ],
});

export default logger;
