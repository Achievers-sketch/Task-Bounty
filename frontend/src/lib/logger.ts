type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  [key: string]: unknown;
}

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const currentLogLevel: LogLevel = (process.env.NEXT_PUBLIC_LOG_LEVEL as LogLevel) || 'info';

function shouldLog(level: LogLevel): boolean {
  return LOG_LEVELS[level] >= LOG_LEVELS[currentLogLevel];
}

function formatLogEntry(level: LogLevel, message: string, metadata?: Record<string, unknown>): LogEntry {
  return {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...metadata,
  };
}

function log(level: LogLevel, message: string, metadata?: Record<string, unknown>) {
  if (!shouldLog(level)) return;

  const entry = formatLogEntry(level, message, metadata);

  switch (level) {
    case 'debug':
      console.debug(entry);
      break;
    case 'info':
      console.info(entry);
      break;
    case 'warn':
      console.warn(entry);
      break;
    case 'error':
      console.error(entry);
      break;
  }
}

export const logger = {
  debug: (message: string, metadata?: Record<string, unknown>) => log('debug', message, metadata),
  info: (message: string, metadata?: Record<string, unknown>) => log('info', message, metadata),
  warn: (message: string, metadata?: Record<string, unknown>) => log('warn', message, metadata),
  error: (message: string, metadata?: Record<string, unknown>) => log('error', message, metadata),
};
