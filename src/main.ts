import axios from 'axios';
import { Client, Intents } from 'discord.js';

require('dotenv').config();

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.DIRECT_MESSAGES,
  ],
  partials: ['MESSAGE', 'CHANNEL'],
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  const content = message.content;
  if (content.substring(0, 4) === '!레이팅') {
    const username = content.substring(5, content.length).trim();

    const valid = username.match(
      /[\uac00-\ud7af]|[\u1100-\u11ff]|[\u3130-\u318f]|[\ua960-\ua97f]|[\ud7b0-\ud7ff]/g,
    );

    if (valid !== null) {
      message.reply('입력가능한 닉네임이 아닙니다.');
    } else {
      const { data: result } = await axios.get(
        `${process.env.API_ROUTE}/users/${username}`,
      );

      const embedUser = {
        color: result.clan ? result.clan.color : 0x0099ff,
        title: `${result.user.username} 레이팅`,
        url: `https://tanks.gg/asia/${result.user.username}`,
        author: {
          name: 'Genimre-레이팅',
          icon_url: 'https://i.imgur.com/FHzy32w.png',
        },
        description: `≫ ${result.user.username} [${result.clan.clanTag}] ≪ 유저의 레이팅입니다.`,
        thumbnail: {
          url: `${result.clan.emblemUrl}`,
        },
        fields: [
          {
            name: 'WN8',
            value: result.rating.wn8,
            inline: true,
          },
          {
            name: '승률',
            value: result.rating.winRate,
            inline: true,
          },
          {
            name: `소속 클랜
  ${result.clan.clanName} [${result.clan.clanTag}]`,
            value: result.clan.description,
          },
        ],
        timestamp: new Date(),
        footer: {
          text: 'Genimre-레이팅',
          icon_url: 'https://i.imgur.com/FHzy32w.png',
        },
      };
      message.reply({ embeds: [embedUser] });
    }
  }
});

client.login(process.env.TOKEN).then(() => {
  console.log('연결되었습니다.');
});
