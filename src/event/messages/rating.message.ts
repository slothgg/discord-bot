import { Message } from 'discord.js';
import { RatingColorConverter } from '../../utils/converter/rating-color.converter';
import { getUserByName } from '../../api/user';
import { UserData } from '../../api/user/type';
import { StatsData } from '../../api/stats/type';
import { ClanData } from '../../api/clan/type';
import EmbedUser from '../../common/embedded/user/embed-user';
import { getStatsByUserWarId } from '../../api/stats';
import { getClanByClanWarId } from '../../api/clan';
import { MESSAGE } from './constant';

export class RatingMessage {
  userData: UserData;
  statsData: StatsData;
  clanData: ClanData;

  ratingColorConverter: RatingColorConverter;

  constructor(private readonly message: Message) {
    this.userData = new UserData();
    this.statsData = new StatsData();
    this.clanData = new ClanData();

    this.ratingColorConverter = new RatingColorConverter();
  }

  /**
   * 레이팅 조회시 기본 전적 메세지 발송
   *
   * @param username string
   */
  async replyDefaultRatingMessage(username: string) {
    try {
      const userResponse = await getUserByName(username);
      await this.userData.setData(userResponse);
    } catch (e) {
      await this.message.reply(MESSAGE.NICKNAME_NOT_FOUND);
    }

    const statsResponse = await getStatsByUserWarId(this.userData.userWarId);
    await this.statsData.setData(statsResponse);

    const clanResponse = await getClanByClanWarId(this.userData.clanWarId);
    await this.clanData.setData(clanResponse);

    const wn8Color: any = await this.ratingColorConverter.getColorOfWN8(
      statsResponse.rating.wn8,
    );

    const embedUser = new EmbedUser();

    embedUser.setColor(this.statsData.rating.wn8 ? wn8Color : 0x0099ff);

    this.clanData
      ? embedUser.setTitle(
          `${this.userData.username} ${
            this.clanData && `[${this.clanData.clanTag}]`
          } 레이팅`,
        )
      : embedUser.setTitle(`${this.userData.username} 레이팅`);

    embedUser.setUrl(
      `https://tomato.gg/stats/ASIA/${this.userData.username}=${this.userData.userWarId}`,
    );
    embedUser.setAuthor({
      name: 'Genimre-레이팅',
      icon_url: 'https://i.imgur.com/FHzy32w.png',
    });

    this.clanData
      ? embedUser.setDescription(
          `≫ ${this.userData.username} [${this.clanData.clanTag}] ≪ 유저의 레이팅입니다.`,
        )
      : embedUser.setDescription(
          `≫ ${this.userData.username} ≪ 유저의 레이팅입니다.`,
        );

    this.clanData &&
      embedUser.setThumbnail({
        url: `${this.clanData.emblemUrl}`,
      });

    const commonFields = [
      {
        name: 'WN8',
        value: `${this.statsData.rating.wn8}
                    ( ${
                      this.statsData.compareWN8 ? this.statsData.compareWN8 : 0
                    } ) `,
        inline: true,
      },
      {
        name: '판 수',
        value: `${this.statsData.rating.battleCount.toString()}
                     ( ${
                       this.statsData.compareBattleCount
                         ? this.statsData.compareBattleCount
                         : 0
                     } )`,
        inline: true,
      },
      {
        name: '승률',
        value: `${this.statsData.rating.winRate}
                     ( ${
                       this.statsData.compareWinRate
                         ? this.statsData.compareWinRate
                         : 0
                     } )`,
        inline: true,
      },
    ];

    this.clanData
      ? embedUser.setFields([
          ...commonFields,
          {
            name: `소속 클랜 ${this.clanData.clanName} [${this.clanData.clanTag}]`,
            value: this.clanData.description,
          },
        ])
      : embedUser.setFields(commonFields);

    embedUser.setTimeStamp(new Date());
    embedUser.setFooter({
      text: 'Genimre-레이팅',
      icon_url: 'https://i.imgur.com/FHzy32w.png',
    });
    //@ts-ignore
    await this.message.reply({ embeds: [embedUser] });
  }
}
