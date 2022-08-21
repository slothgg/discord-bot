// 사용 예시
/*
 export const embedUser = {
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
*/

// TODO: Getters Setters 적용 안되는 이슈 해결 필요
import { Getters } from '../../utils/decorator/getter/getters.decorator';
import { Setters } from '../../utils/decorator/setter/setters.decorator';
import { EmbedForm } from '../common/embed-form';

export class EmbedUser extends EmbedForm {}
