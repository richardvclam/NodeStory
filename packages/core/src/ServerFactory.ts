import { IClientInfo } from './Client';
import { IServerCryptoConfig, Server } from './Server';

export class ServerFactoryStatic {
  public createServer(
    port: number,
    clientConfig: IClientInfo,
    cryptoConfig: IServerCryptoConfig,
    modules: any,
  ) {
    return new Server(port, clientConfig, cryptoConfig, modules);
  }
}

export const ServerFactory = new ServerFactoryStatic();
