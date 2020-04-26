import { IClientInfo } from './Client';
import { IPacketHandler } from './network';
import { IServerCryptoConfig, Server } from './Server';

export class ServerFactoryStatic {
  public createServer(
    port: number,
    clientConfig: IClientInfo,
    cryptoConfig: IServerCryptoConfig,
    handlers: IPacketHandler[],
  ) {
    return new Server(port, clientConfig, cryptoConfig, handlers);
  }
}

export const ServerFactory = new ServerFactoryStatic();
