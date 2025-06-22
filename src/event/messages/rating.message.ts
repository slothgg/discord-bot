import { Message } from 'discord.js';

import { RatingColorConverter } from '@/utils/converter/rating-color.converter';
import { getUserByName } from '@/api/user';
import { UserData } from '@/api/user/type';
import { RecentStatsData, StatsData } from '@/api/stats/type';
import { ClanData } from '@/api/clan/type';
import { getRecentStatsByUserWarId, getStatsByUserWarId } from '@/api/stats';
import { getClanByClanWarId } from '@/api/clan';
import EmbedUser from '@/common/embedded/user/embed-user';
import { MESSAGE } from './constant';

export class RatingMessage {
  userData: UserData;
  clanData: ClanData;
  statsData: StatsData;
  recentStatsData: RecentStatsData;

  ratingColorConverter: RatingColorConverter;

  title: string;

  constructor(private readonly message: Message) {
    this.userData = new UserData();
    this.clanData = new ClanData();
    this.statsData = new StatsData();
    this.recentStatsData = new RecentStatsData();

    this.ratingColorConverter = new RatingColorConverter();

    this.title = '';
  }

  /**
   * 레이팅 조회시 기본 전적 메세지 발송
   *
   * @param username string
   */
  async replyDefaultRatingMessage(username: string) {
    await this.getUserResponseData(username);
    await this.getClanResponseData();

    const statsResponse = await getStatsByUserWarId(this.userData.userWarId);
    await this.statsData.setData(statsResponse);

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

  /**
   * 최근 1000판 레이팅 조회 결과 메세지 발송
   *
   * @param username string
   * @param options { keyword: string }
   */
  async replyRecentRatingMessage(
    username: string,
    options: { keyword: string },
  ): Promise<void> {
    await this.getUserResponseData(username);
    await this.getClanResponseData();

    const recentStatsResponse = await getRecentStatsByUserWarId(
      this.userData.userWarId,
    );

    switch (options?.keyword) {
      case 'recent1000':
        await this.recentStatsData.setThousandData(recentStatsResponse);
        this.title = 'Last 1000판 레이팅';
        break;
      case 'recent24hr':
        await this.recentStatsData.setTwentyFourHourData(recentStatsResponse);
        this.title = '최근 24시간 레이팅';
        break;
    }

    const embedUser = new EmbedUser();

    await this.setRecentStatsData(embedUser, options.keyword);

    this.clanData
      ? embedUser.setTitle(
          `${this.userData.username} ${
            this.clanData && `[${this.clanData.clanTag}]`
          } ${this.title}`,
        )
      : embedUser.setTitle(`${this.userData.username} ${this.title}`);

    embedUser.setUrl(
      `https://tomato.gg/stats/ASIA/${this.userData.username}=${this.userData.userWarId}`,
    );
    embedUser.setAuthor({
      name: 'Genimre-레이팅',
      icon_url: 'https://i.imgur.com/FHzy32w.png',
    });

    this.clanData
      ? embedUser.setDescription(
          `≫ ${this.userData.username} [${this.clanData.clanTag}] ≪ 유저의 ${this.title}입니다.`,
        )
      : embedUser.setDescription(
          `≫ ${this.userData.username} ≪ 유저의 ${this.title} 레이팅입니다.`,
        );

    this.clanData &&
      embedUser.setThumbnail({
        url: `${this.clanData.emblemUrl}`,
      });

    embedUser.setTimeStamp(new Date());
    embedUser.setFooter({
      text: 'Genimre-레이팅',
      icon_url: 'https://i.imgur.com/FHzy32w.png',
    });
    //@ts-ignore
    await this.message.reply({ embeds: [embedUser] });
  }

  async setRecentStatsData(embedUser: EmbedUser, type: string): Promise<void> {
    let wn8Color: any = '';
    let commonFields: { name: string; value: string; inline: boolean }[] = [];

    switch (type) {
      case 'recent1000':
        wn8Color = await this.ratingColorConverter.getColorOfWN8(
          this.recentStatsData.recent1000Stats.wn8.toString(),
        );

        embedUser.setColor(
          this.recentStatsData.recent1000Stats.wn8 ? wn8Color : 0x0099ff,
        );

        commonFields = [
          {
            name: 'WN8',
            value: `${this.recentStatsData.recent1000Stats.wn8}`,
            inline: true,
          },
          {
            name: '판 수',
            value: `${this.recentStatsData.recent1000Stats.battles}`,
            inline: true,
          },
          {
            name: '승률',
            value: `${this.recentStatsData.recent1000Stats.winRate}`,
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
        break;
      case 'recent24hr':
        wn8Color = await this.ratingColorConverter.getColorOfWN8(
          this.recentStatsData.recent24hrStats.wn8.toString(),
        );

        embedUser.setColor(
          this.recentStatsData.recent24hrStats.wn8 ? wn8Color : 0x0099ff,
        );

        commonFields = [
          {
            name: 'WN8',
            value: `${this.recentStatsData.recent24hrStats.wn8}`,
            inline: true,
          },
          {
            name: '판 수',
            value: `${this.recentStatsData.recent24hrStats.battles}`,
            inline: true,
          },
          {
            name: '승률',
            value: `${this.recentStatsData.recent24hrStats.winRate}`,
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
        break;
    }
  }

  /**
   * 유저 기본 정보 조회
   *
   * @param username
   */
  async getUserResponseData(username: string): Promise<void> {
    try {
      const userResponse = await getUserByName(username);
      await this.userData.setData(userResponse);
    } catch (e) {
      await this.message.reply(MESSAGE.NICKNAME_NOT_FOUND);
    }
  }

  /**
   * 유저 클랜 정보 조회
   */
  async getClanResponseData(): Promise<void> {
    const clanResponse = await getClanByClanWarId(this.userData.clanWarId);
    await this.clanData.setData(clanResponse);
  }
}
