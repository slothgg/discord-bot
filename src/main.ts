import { Intents } from 'discord.js';
import { getUserByName } from './api/user';
import { RatingColorConverter } from './utils/converter/rating-color.converter';
import EmbedUser from './common/embedded/user/embed-user';
import DiscordFactory from './common/core';
import { GetUserResponse } from './api/user/type';

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

  app.init();

  app.once('ready', () => {
    console.log(`Logged in as ${app.user.tag}!`);
  });

  app.on('messageCreate', async (message) => {
    const content = message.content;
    const target = content.split(' ');
    switch (target[0]) {
      case '!레이팅':
        const username = content.substring(5, content.length).trim();

        const valid = username.match(
          /[\uac00-\ud7af]|[\u1100-\u11ff]|[\u3130-\u318f]|[\ua960-\ua97f]|[\ud7b0-\ud7ff]/g,
        );

        if (valid !== null) {
          message.reply('입력 가능한 닉네임이 아닙니다.');
        } else {
          let result: GetUserResponse;

          await getUserByName(username)
            .then((data) => {
              result = data;
            })
            .catch(() => {
              message.reply('없는 닉네임입니다.');
            });

          if (result) {
            const ratingColorConverter = new RatingColorConverter();
            const wn8Color: any = await ratingColorConverter.getColorOfWN8(
              result.rating.rating.wn8,
            );

            const embedUser = new EmbedUser();

            embedUser.setColor(result.rating.rating.wn8 ? wn8Color : 0x0099ff);
            embedUser.setTitle(
              `${result.user.username} [${result.clan.clanTag}] 레이팅`,
            );
            embedUser.setUrl(`https://tanks.gg/asia/${result.user.username}`);
            embedUser.setAuthor({
              name: 'Genimre-레이팅',
              icon_url: 'https://i.imgur.com/FHzy32w.png',
            });
            embedUser.setDescription(
              `≫ ${result.user.username} [${result.clan.clanTag}] ≪ 유저의 레이팅입니다.`,
            );
            embedUser.setThumbnail({
              url: `${result.clan.emblemUrl}`,
            });
            embedUser.setFields([
              {
                name: 'WN8',
                value: `${result.rating.rating.wn8}
                    ( ${
                      result.rating.compareWN8 ? result.rating.compareWN8 : 0
                    } ) `,
                inline: true,
              },
              {
                name: '판 수',
                value: `${result.rating.rating.battleCount.toString()}
                     ( ${
                       result.rating.compareBattleCount
                         ? result.rating.compareBattleCount
                         : 0
                     } )`,
                inline: true,
              },
              {
                name: '승률',
                value: `${result.rating.rating.winRate}
                     ( ${
                       result.rating.compareWinRate
                         ? result.rating.compareWinRate
                         : 0
                     } )`,
                inline: true,
              },
              {
                name: `소속 클랜 ${result.clan.clanName} [${result.clan.clanTag}]`,
                value: result.clan.description,
              },
            ]);
            embedUser.setTimeStamp(new Date());
            embedUser.setFooter({
              text: 'Genimre-레이팅',
              icon_url: 'https://i.imgur.com/FHzy32w.png',
            });
            //@ts-ignore
            message.reply({ embeds: [embedUser] });
          }
        }
    }
  });
}

bootStrap();
