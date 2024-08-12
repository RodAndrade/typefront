export class LogsConstants {
  static readonly API: boolean = process?.env?.NEXT_PUBLIC_DEBUG_API === 'true';
  static readonly ENABLED: boolean = process?.env?.NEXT_PUBLIC_DEBUG === 'true';
}
