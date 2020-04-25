import { NodeStoryFactory } from '@nodestory/core';

import clientConfig from './config/client.config.json';
import cryptoConfig from './config/crypto.config.json';
import databaseConfig from './config/database.config.json';
import { LoginServer } from './login/LoginServer';

const { version, subversion } = clientConfig;
const { aesKey } = cryptoConfig;

async function bootstrap() {
  const app = await NodeStoryFactory.create(
    {
      version,
      subversion,
      aesKey,
      databaseUrl: databaseConfig.url,
    },
    LoginServer,
    // WorldServer,
  );
  app.start();
}

bootstrap();
