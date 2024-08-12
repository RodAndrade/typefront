import { LogsConstants } from '@constants/log';

import { ILogProvider, LogOptions, LogType } from './types';

class LogProvider implements ILogProvider {
  private uuid: string = '[ForSign]';
  private enabledLog: boolean;

  constructor(title: string = '', options?: LogOptions) {
    if (!!title) {
      this.uuid = `[ForSign:${title}]`;
    }

    this.enabledLog = options?.enabled ?? true;
  }

  private validate(message: string, type: LogType = 'debug') {
    if (typeof this.enabledLog !== 'undefined') {
      return this.enabledLog;
    }

    if (!LogsConstants.ENABLED && type !== 'debug') {
      this.log(message, null, type);
    }

    return LogsConstants.ENABLED;
  }

  private getLogColor(type?: LogType) {
    const colorList = {
      success: '#46A971',
      debug: '#4956E3',
      info: '',
      warn: '#F6CD04',
      error: '#E45770',
    };

    return type ? colorList[type] : colorList.info;
  }

  private log(message: string, data?: any, type?: LogType) {
    const color = this.getLogColor(type);

    if (!data) {
      console.log(`%c${this.uuid}`, `color: ${color}`, message);
    } else {
      console.debug(`%c${this.uuid}`, `color: ${color}`, message, data);
    }
  }

  setTitle(title: string = '') {
    if (!!title) {
      this.uuid = `[ForSign:${title}]`;
    }
  }

  debug(message: string, data?: any) {
    const isValidated = this.validate(message, 'debug');

    this.log(message, isValidated ? data : null, 'debug');
  }

  success(message: string, data: any = null, validate: boolean = false) {
    if (validate && !this.validate(message, 'success')) return;

    this.log(message, data, 'success');
  }

  info(message: string, data: any = null, validate: boolean = false) {
    if (validate && !this.validate(message, 'info')) return;

    this.log(message, data, 'info');
  }

  warn(message: string, data: any = null, validate: boolean = false) {
    if (validate && !this.validate(message, 'warn')) return;

    this.log(message, data, 'warn');
  }

  error(message: string, data: any = null, validate: boolean = false) {
    if (validate && !this.validate(message, 'error')) return;

    this.log(message, data, 'error');
  }
}

export { LogProvider as Debugger };
export default LogProvider;
