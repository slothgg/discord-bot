import { Client, Intents } from 'discord.js';
import { getUserByName } from './api/user';
import { EmbedUser } from './embedded/user/embed-user';
import { RatingColorConverter } from './utils/converter/rating-color.converter';

async function bootStrap() {
  const app = new Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_INTEGRATIONS,
      Intents.FLAGS.DIRECT_MESSAGES,
    ],
    partials: ['MESSAGE', 'CHANNEL'],
  });

  app.once('ready', () => {
    console.log(`Logged in as ${app.user.tag}!`);
  });

  app.on('messageCreate', async (message) => {
    console.log(typeof message);
    const content = message.content;
    const target = content.split(' ');
    switch (target[0]) {
      case '!레이팅':
        const username = content.substring(5, content.length).trim();

        const valid = username.match(
          /[\uac00-\ud7af]|[\u1100-\u11ff]|[\u3130-\u318f]|[\ua960-\ua97f]|[\ud7b0-\ud7ff]/g,
        );

        if (valid !== null) {
          message.reply('입력가능한 닉네임이 아닙니다.');
        } else {
          const result = await getUserByName(username);

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
              ( ${result.rating.compareWN8} )`,
              inline: true,
            },
            {
              name: '판 수',
              value: `${result.rating.rating.battleCount.toString()}
               ( ${result.rating.compareBattleCount} )`,
              inline: true,
            },
            {
              name: '승률',
              value: `${result.rating.rating.winRate}
              ( ${result.rating.compareWinRate} )`,
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
  });

  app.login(process.env.TOKEN).then(() => {
    console.log('연결되었습니다.');
  });
}

bootStrap();
