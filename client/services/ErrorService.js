/**
 * @file ErrorService.js
 * @description Interprets errors, and notifies user.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

export default class ErrorService {
  /**
   * Decides what to do with error.
   * @param {Object} error Error object from whatever context.
   */
  static parseError(error) {
    console.error(error); // eslint-disable-line
  }
}
