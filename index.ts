import { IncomingMessage, ServerResponse } from 'http';

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace dnsPrefetchControl {
  export interface DnsPrefetchControlOptions {
    allow?: boolean;
  }
}

function getHeaderValueFromOptions(options?: dnsPrefetchControl.DnsPrefetchControlOptions): 'on' | 'off' {
  if (options && options.allow) {
    return 'on';
  } else {
    return 'off';
  }
}

// eslint-disable-next-line no-redeclare
function dnsPrefetchControl (options?: dnsPrefetchControl.DnsPrefetchControlOptions) {
  const headerValue = getHeaderValueFromOptions(options);

  return function dnsPrefetchControl (_req: IncomingMessage, res: ServerResponse, next: () => void) {
    res.setHeader('X-DNS-Prefetch-Control', headerValue);
    next();
  };
}

export = dnsPrefetchControl;
