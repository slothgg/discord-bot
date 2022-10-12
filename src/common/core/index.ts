import { Client, PartialTypes } from 'discord.js';
import { Logger } from '../logger';

export default class DiscordFactory extends Client {
  public logger = new Logger();

  constructor(intents: any[], partials: PartialTypes[]) {
    super({
      intents,
      partials,
    });
  }

  public async init() {
    await this.login(process.env.TOKEN)
      .then(() => this.logger.log('Connected to Discord Server'))
      .catch((err) => this.logger.error(err.message));

    this.once('ready', () => {
      console.log(`Logged in as ${this.user.tag}!`);
    });
  }
}
