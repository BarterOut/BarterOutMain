/**
 * @file util.js
 * @description General utilites for the app.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

export default class Util {
  /**
   * Returns the ordinal suffix of a given
   * number, appened to it, e.g. '3rd'
   * @param {Number} num Given number.
   */
  static ordinalSuffixOf(num) {
    const j = num % 10;
    const k = num % 100;
    if (j == 1 && k != 11) {
      return `${num}st`;
    }
    if (j == 2 && k != 12) {
      return `${num}nd`;
    }
    if (j == 3 && k != 13) {
      return `${num}rd`;
    }
    return `${num}th`;
  }
}
