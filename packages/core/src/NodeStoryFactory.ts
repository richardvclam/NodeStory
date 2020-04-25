import mongoose from 'mongoose';

import { INodeStoryServerConfig, NodeStory } from './NodeStory';
import { Server } from './Server';
import { Log } from './utils/Log';

export class NodeStoryFactory {
  /**
   * Creates an instance of NodeStory.
   * @param config
   * @param servers
   */
  public static async create(
    config: INodeStoryServerConfig,
    ...servers: Server[]
  ) {
    const nodeStory = new NodeStory(config, servers);
    nodeStory.init();

    await mongoose.connect(config.databaseUrl, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    return nodeStory;
  }
}
