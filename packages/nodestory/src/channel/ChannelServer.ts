import { ServerFactory } from '@nodestory/core';

import clientConfig from '../config/client.config.json';
import cryptoConfig from '../config/crypto.config.json';
import loginServerConfig from '../config/loginserver.config.json';
import handlers from './handlers';

export const ChannelServer = ServerFactory.createServer(
  { name: "ChannelServer-1", port: loginServerConfig.worlds[0].portStart },
  clientConfig,
  {
    aesKey: cryptoConfig.aesKey,
  },
  handlers,
);
