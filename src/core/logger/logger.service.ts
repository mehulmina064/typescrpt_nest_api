import { Logger, Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class CanLogger extends Logger {
  /**
   * Override the Default Nest Logger function Here
   *
   * i.e. error, debug, verbose, warn etc.
   */
  error(message: string, trace: string) {
    // Invoke the Nest Logger
    super.error(message, trace);
  }
}
