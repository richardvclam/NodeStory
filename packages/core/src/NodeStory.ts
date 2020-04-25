import { Server } from './Server';
import { Log } from './utils/Log';

export interface INodeStoryServerConfig {
  version: number;
  subversion: string;
  aesKey: number[];
  databaseUrl: string;
}

export class NodeStory {
  constructor(
    private readonly config: INodeStoryServerConfig,
    private readonly servers: Server[],
  ) {}

  public init() {
    this.servers.forEach((server) => server.init());
  }

  public start() {
    Log.info("Starting NodeStory...");
    Log.info(`Version: ${this.config.version}.${this.config.subversion}`);

    this.servers.forEach((server) => server.start());
  }
}
