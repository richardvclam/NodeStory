import { ServerFactory } from '@nodestory/core';

import clientConfig from '../config/client.config.json';
import cryptoConfig from '../config/crypto.config.json';
import loginServerConfig from '../config/loginserver.config.json';
import handlers from './handlers';

export const LoginServer = ServerFactory.createServer(
  loginServerConfig.port,
  clientConfig,
  {
    aesKey: cryptoConfig.aesKey,
  },
  handlers,
);
