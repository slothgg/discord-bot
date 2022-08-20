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

  // if (wnRating < 300) {
  //   return this.colors.veryBad;
  // } else if (wnRating < 449) {
  //   return this.colors.bad;
  // } else if (wnRating < 649) {
  //   return this.colors.belowAverage;
  // } else if (wnRating < 899) {
  //   return this.colors.average;
  // } else if (wnRating < 1199) {
  //   return this.colors.aboveAverage;
  // } else if (wnRating < 1599) {
  //   return this.colors.good;
  // } else if (wnRating < 1999) {
  //   return this.colors.veryGood;
  // } else if (wnRating < 2449) {
  //   return this.colors.great;
  // } else if (wnRating < 2899) {
  //   return this.colors.unicum;
  // } else if (wnRating > 2900) {
  //   return this.colors.superUnicum;
  // }
}
