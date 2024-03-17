import { Intents } from 'discord.js';
import DiscordFactory from './common/core';
import { RatingMessage } from './event/messages/rating.message';
import { ValidMessage } from './event/messages/valid.message';
import { MESSAGE } from './event/messages/constant';

async function bootStrap() {
  const app = new DiscordFactory(
    [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_INTEGRATIONS,
      Intents.FLAGS.DIRECT_MESSAGES,
    ],
    ['MESSAGE', 'CHANNEL'],
  );

  await app.init();

  app.on('messageCreate', async (message) => {
    const content = message.content;
    const target = content.split(' ');

    const validMessage = new ValidMessage(message);

    switch (target[0]) {
      case '!레이팅':
        await validMessage.replyInputInValidMessage(
          content,
          async (username: string) => {
            await message.reply(MESSAGE.LOAD_RATING);

            const ratingMessage = new RatingMessage(message);
            await ratingMessage.replyDefaultRatingMessage(username);
          },
        );
        break;

      case '!라천배':
        await validMessage.replyInputInValidMessage(
          content,
          async (username: string) => {
            await message.reply(MESSAGE.LOAD_RATING);

            const ratingMessage = new RatingMessage(message);
            await ratingMessage.replyRecentRatingMessage(username, {
              keyword: 'recent1000',
            });
          },
        );
        break;

      case '!24':
        await validMessage.replyInputInValidMessage(
          content,
          async (username: string) => {
            await message.reply(MESSAGE.LOAD_RATING);

            const ratingMessage = new RatingMessage(message);
            await ratingMessage.replyRecentRatingMessage(username, {
              keyword: 'recent24hr',
            });
          },
        );
    }
  });
}

bootStrap();
