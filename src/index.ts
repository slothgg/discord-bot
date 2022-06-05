import axios from 'axios';
import { Client } from 'discord.js';

const { Intents } = require('discord.js');
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
    const { data: result } = await axios.get(
      `${process.env.API_ROUTE}/users/${username}`,
    );

    const embedUser = {
      color: 0x0099ff,
      title: `${result.user.username} 유저 레이팅`,
      url: `https://tanks.gg/asia/${result.user.username}`,
      author: {
        name: 'Genimre-레이팅',
        icon_url: 'https://i.imgur.com/AfFp7pu.png',
      },
      description: `≫ ${result.user.username} [${result.clan.clanTag}] ≪ 해당 유저의 레이팅입니다.`,
      thumbnail: {
        url: 'https://i.imgur.com/AfFp7pu.png',
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
        icon_url: 'https://i.imgur.com/AfFp7pu.png',
      },
    };
    message.reply({ embeds: [embedUser] });
  }
});

client.login(process.env.TOKEN).then(() => console.log('연결되었습니다.'));
