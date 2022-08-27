import { RatingColor } from './color.type';

export class RatingColorConverter {
  private colors: RatingColor;

  constructor() {
    this.colors = {
      veryBad: '#930D0E',
      bad: '#CD3333',
      belowAverage: '#CC7A00',
      average: '#CCB800',
      aboveAverage: '#849B24',
      good: '#4D7326',
      veryGood: '#4199BF',
      great: '#3A72C6',
      unicum: '#783EB6',
      superUnicum: '#401370',
    };
  }

  async getColorOfWN8(wn8: string): Promise<string> {
    const wnRating = +wn8;
    if (wnRating < 300) {
      return this.colors.veryBad;
    }

    if (wnRating > 300 && wnRating < 449) {
      return this.colors.bad;
    }

    if (wnRating > 450 && wnRating < 649) {
      return this.colors.belowAverage;
    }

    if (wnRating > 650 && wnRating < 899) {
      return this.colors.average;
    }

    if (wnRating > 900 && wnRating < 1199) {
      return this.colors.aboveAverage;
    }

    if (wnRating > 1200 && wnRating < 1599) {
      return this.colors.good;
    }

    if (wnRating > 1600 && wnRating < 1999) {
      return this.colors.veryGood;
    }

    if (wnRating > 2000 && wnRating < 2449) {
      return this.colors.great;
    }

    if (wnRating > 2450 && wnRating < 2899) {
      return this.colors.unicum;
    }

    if (wnRating > 2900) {
      return this.colors.superUnicum;
    }
  }

  async getColorOfWinRate(winRate: string): Promise<string> {
    const winRating = +winRate;

    if (winRating < 46) {
      return this.colors.veryBad;
    }

    if (winRating > 46 && winRating < 47) {
      return this.colors.bad;
    }

    if (winRating > 47 && winRating < 48) {
      return this.colors.belowAverage;
    }

    if (winRating > 48 && winRating < 49) {
      return this.colors.average;
    }

    if (winRating > 49 && winRating < 51) {
      return this.colors.aboveAverage;
    }

    if (winRating > 51 && winRating < 53) {
      return this.colors.good;
    }
    if (winRating > 53 && winRating < 55) {
      return this.colors.veryGood;
    }
    if (winRating > 55 && winRating < 59) {
      return this.colors.great;
    }
    if (winRating > 59 && winRating < 64) {
      return this.colors.unicum;
    }
    if (winRating > 65) {
      return this.colors.superUnicum;
    }
  }
}
