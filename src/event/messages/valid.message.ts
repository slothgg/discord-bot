import { Message } from 'discord.js';
import { validInput } from '../common/validator';
import { MESSAGE } from './constant';

export class ValidMessage {
  constructor(private readonly message: Message) {}

  /**
   * 입력된 닉네임이 유효한지 확인후 onSuccess 내 함수 실행
   *
   * @param content string
   * @param onSuccess Function
   */
  async replyInputInValidMessage(
    content: string,
    onSuccess?: Function,
  ): Promise<void> {
    const validInputData = validInput(content);

    if (validInputData.valid !== null) {
      await this.message.reply(MESSAGE.INVALID_INPUT);
      return;
    }

    await onSuccess(validInputData.username);
  }
}
