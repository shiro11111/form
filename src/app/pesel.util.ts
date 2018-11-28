import * as moment from 'moment';

/**
 * Statyczna klasa do obsługi Pesela
 *
 * @source http://www.algorytm.org/numery-identyfikacyjne/pesel/pesel-j.html
 */
export class PeselUtil {

  /** Długość numeru PESEL */
  static readonly peselLength = 11;

  /** Dostaje datę urodzenia z PESEL-u */
  static getBirthDate(pesel: string): Date {
    return moment()
      .year(PeselUtil.getBirthYear(pesel))
      .month(PeselUtil.getBirthMonth(pesel) - 1)
      .date(PeselUtil.getBirthDay(pesel))
      .startOf('day')
      .toDate();
  }

  /** Dostaje rok urodzenia z PESEL-u */
  static getBirthYear(pesel: string): number {
    let year: number;
    let month: number;
    year = 10 * +pesel[0];
    year += +pesel[1];
    month = 10 * +pesel[2];
    month += +pesel[3];
    if (month > 80 && month < 93) {
      year += 1800;
    } else if (month > 0 && month < 13) {
      year += 1900;
    } else if (month > 20 && month < 33) {
      year += 2000;
    } else if (month > 40 && month < 53) {
      year += 2100;
    } else if (month > 60 && month < 73) {
      year += 2200;
    }
    return year;
  }

  /** Dostaje miesiąc urodzenia z PESEL-u */
  static getBirthMonth(pesel: string): number {
    let month: number;
    month = 10 * +pesel[2];
    month += +pesel[3];
    if (month > 80 && month < 93) {
      month -= 80;
    } else if (month > 20 && month < 33) {
      month -= 20;
    } else if (month > 40 && month < 53) {
      month -= 40;
    } else if (month > 60 && month < 73) {
      month -= 60;
    }
    return month;
  }

  /** Dostaje dzień urodzenia z PESEL-u */
  static getBirthDay(pesel: string): number {
    return 10 * +pesel[4] + +pesel[5];
  }

  /** Dostaje płeć z PESEL-u */
  static getSex(pesel: string): string {
    const sexDigit = +pesel[9];
    if (isNaN(sexDigit)) {
      return null;
    } else {
      return sexDigit % 2 === 1 ? 'M' : 'K';
    }
  }

  /** Sprawdza czy poprawny PESEL */
  static checkSum(pesel: string): boolean {
    let sum = +pesel[0] +
      3 * +pesel[1] +
      7 * +pesel[2] +
      9 * +pesel[3] +
      +pesel[4] +
      3 * +pesel[5] +
      7 * +pesel[6] +
      9 * +pesel[7] +
      +pesel[8] +
      3 * +pesel[9];
    sum %= 10;
    sum = 10 - sum;
    sum %= 10;
    return sum === +pesel[10];
  }
}
