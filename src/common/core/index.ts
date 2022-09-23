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
    this.logger.log('Initializing...');
    this.logger.log('Initialize Done');

    await this.login(process.env.TOKEN)
      .then(() => this.logger.log('Connected to Discord Server'))
      .catch((err) => this.logger.error(err.message));
  }
}
