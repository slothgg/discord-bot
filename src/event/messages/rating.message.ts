import { Message } from 'discord.js';
import { RatingColorConverter } from '../../utils/converter/rating-color.converter';
import { getUserByName } from '../../api/user';
import { UserData } from '../../api/user/type';

export class RatingMessage {
  userData: UserData;
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
  }
}
