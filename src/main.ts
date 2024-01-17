import { Intents } from 'discord.js';
import DiscordFactory from './common/core';
import { validInput } from './event/common/validator';
import { RatingMessage } from './event/messages/rating.message';

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

    switch (target[0]) {
      case '!레이팅':
        const validInputData = validInput(content);

        if (validInputData.valid !== null) {
          await message.reply('입력 가능한 닉네임이 아닙니다.');
        } else {
          await message.reply(
            '레이팅을 조회 중입니다.... 잠시만 기다려주세요.',
          );

          const ratingMessage = new RatingMessage(message);
          await ratingMessage.replyDefaultRatingMessage(
            validInputData.username,
          );
        }
    }
  });
}

bootStrap();
