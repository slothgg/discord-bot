import { Client, Intents, PartialTypes } from 'discord.js';
import { Logger } from '../logger';

export default class DiscordFactory extends Client {
  public logger = new Logger();

  constructor(intents: Intents[], partials: PartialTypes[]) {
    super({
      intents,
      partials,
    });
  }

  public async init() {
    this.logger.log('');
  }
}
