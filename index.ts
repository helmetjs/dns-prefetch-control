import { IncomingMessage, ServerResponse } from 'http';

interface DnsPrefetchControlOptions {
  allow?: boolean;
}

function getHeaderValueFromOptions(options?: DnsPrefetchControlOptions): 'on' | 'off' {
  if (options && options.allow) {
    return 'on';
  } else {
    return 'off';
  }
}

export = function dnsPrefetchControl (options?: DnsPrefetchControlOptions) {
  const headerValue = getHeaderValueFromOptions(options);

  return function dnsPrefetchControl (_req: IncomingMessage, res: ServerResponse, next: () => void) {
    res.setHeader('X-DNS-Prefetch-Control', headerValue);
    next();
  };
}
