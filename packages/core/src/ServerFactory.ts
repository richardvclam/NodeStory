import { IClientInfo } from './Client';
import { IPacketHandler } from './network';
import { IServerConfig, IServerCryptoConfig, Server } from './Server';

export class ServerFactoryStatic {
  public createServer(
    serverConfig: IServerConfig,
    clientConfig: IClientInfo,
    cryptoConfig: IServerCryptoConfig,
    handlers: IPacketHandler[],
  ) {
    return new Server(serverConfig, clientConfig, cryptoConfig, handlers);
  }
}

export const ServerFactory = new ServerFactoryStatic();
