import { Message } from 'discord.js';
import { RatingColorConverter } from '../../utils/converter/rating-color.converter';
import { getUserByName } from '../../api/user';
import { UserData } from '../../api/user/type';
import { StatsData } from '../../api/stats/type';
import EmbedUser from '../../common/embedded/user/embed-user';
import { getStatsByUserWarId } from '../../api/stats';

export class RatingMessage {
  userData: UserData;
  statsData: StatsData;

  ratingColorConverter: RatingColorConverter;

  constructor(private readonly message: Message) {
    this.ratingColorConverter = new RatingColorConverter();
  }

  async replyDefaultRatingMessage(username: string) {
    try {
      const userResponse = await getUserByName(username);
      this.userData.set(userResponse);
    } catch (e) {
      await this.message.reply('없는 닉네임입니다.');
    }

    const statsResponse = await getStatsByUserWarId(this.userData.userWarId);
    this.statsData.set(statsResponse);

    const wn8Color: any = this.ratingColorConverter.getColorOfWN8(
      statsResponse.rating.wn8,
    );

    const embedUser = new EmbedUser();

    embedUser.setColor(this.statsData.rating.wn8 ? wn8Color : 0x0099ff);

    // result.clan
    //   ? embedUser.setTitle(
    //       `${result.user.username} ${
    //         result.clan && `[${result.clan.clanTag}]`
    //       } 레이팅`,
    //     )
    //   : embedUser.setTitle(`${result.user.username} 레이팅`);
    //
    // embedUser.setUrl(
    //   `https://tomato.gg/stats/ASIA/${result.user.username}=${result.user.userWarId}`,
    // );
    // embedUser.setAuthor({
    //   name: 'Genimre-레이팅',
    //   icon_url: 'https://i.imgur.com/FHzy32w.png',
    // });
    //
    // result.clan
    //   ? embedUser.setDescription(
    //       `≫ ${result.user.username} [${result.clan.clanTag}] ≪ 유저의 레이팅입니다.`,
    //     )
    //   : embedUser.setDescription(
    //       `≫ ${result.user.username} ≪ 유저의 레이팅입니다.`,
    //     );
    //
    // result.clan &&
    //   embedUser.setThumbnail({
    //     url: `${result.clan.emblemUrl}`,
    //   });
    //
    // result.clan
    //   ? embedUser.setFields([
    //       {
    //         name: 'WN8',
    //         value: `${result.rating.data.wn8}
    //                 ( ${
    //                   result.rating.compareWN8 ? result.rating.compareWN8 : 0
    //                 } ) `,
    //         inline: true,
    //       },
    //       {
    //         name: '판 수',
    //         value: `${result.rating.data.battleCount.toString()}
    //                  ( ${
    //                    result.rating.compareBattleCount
    //                      ? result.rating.compareBattleCount
    //                      : 0
    //                  } )`,
    //         inline: true,
    //       },
    //       {
    //         name: '승률',
    //         value: `${result.rating.data.winRate}
    //                  ( ${
    //                    result.rating.compareWinRate
    //                      ? result.rating.compareWinRate
    //                      : 0
    //                  } )`,
    //         inline: true,
    //       },
    //       {
    //         name: `소속 클랜 ${result.clan.clanName} [${result.clan.clanTag}]`,
    //         value: result.clan.description,
    //       },
    //     ])
    //   : embedUser.setFields([
    //       {
    //         name: 'WN8',
    //         value: `${result.rating.data.wn8}
    //                 ( ${
    //                   result.rating.compareWN8 ? result.rating.compareWN8 : 0
    //                 } ) `,
    //         inline: true,
    //       },
    //       {
    //         name: '판 수',
    //         value: `${result.rating.data.battleCount.toString()}
    //                  ( ${
    //                    result.rating.compareBattleCount
    //                      ? result.rating.compareBattleCount
    //                      : 0
    //                  } )`,
    //         inline: true,
    //       },
    //       {
    //         name: '승률',
    //         value: `${result.rating.data.winRate}
    //                  ( ${
    //                    result.rating.compareWinRate
    //                      ? result.rating.compareWinRate
    //                      : 0
    //                  } )`,
    //         inline: true,
    //       },
    //     ]);
    embedUser.setTimeStamp(new Date());
    embedUser.setFooter({
      text: 'Genimre-레이팅',
      icon_url: 'https://i.imgur.com/FHzy32w.png',
    });
    //@ts-ignore
    await message.reply({ embeds: [embedUser] });
  }
}
