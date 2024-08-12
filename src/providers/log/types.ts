export type LogType = 'success' | 'info' | 'debug' | 'warn' | 'error';

export interface ILogProvider {
  debug: (message: string, data?: any) => void;
  success: (message: string, data?: any, validate?: boolean) => void;
  info: (message: string, data?: any, validate?: boolean) => void;
  warn: (message: string, data?: any, validate?: boolean) => void;
  error: (message: string, data?: any, validate?: boolean) => void;
}

export type LogOptions = {
  enabled?: boolean;
};
