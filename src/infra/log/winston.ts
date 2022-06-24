import winston, { format } from 'winston'

const { combine, timestamp, label, printf } = format
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`
})

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
  ],
  format: combine(
    label({ label: 'Subsfy log!' }),
    timestamp(),
    myFormat
  ),
  exitOnError: false,
})
