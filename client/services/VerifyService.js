/**
 * @file VerifyService.js
 * @description Verifys various forms of input provided by the user.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

export default class VerifyService {
  /**
   * Verifys if two entered passwords match, and
   * also returns the strength of the first password.
   * @param {String} p1 First password entered.
   * @param {String} p2 Second password entered.
   */
  static verifyPasswords(p1, p2) {
    return p1 === p2;
  }

  /**
   * Returns a value from 1-10 denoting password strength,
   * 1-worst 10-best.
   * @param {String} password Password to check.
   */
  static getPasswordStrength(password) {
    let length = 0;
    if (/\d/.test(password)) {
      length += 15;
    }
    if (/[~`!#$%^&*+=\-[\]\\';,/{}|\\":<>?]/g.test(password)) {
      length += 15;
    }
    const tLength = password.length + length;
    const strength = 1 / (1 + (1.05 ** -tLength)) - 0.5;

    return strength * 18;
  }

  /**
   * Verifys that a given email is a UR email.
   * @param {String} email Email address to check.
   */
  static verifyEmail(email) {
    const checkerEmail = email.split('@')[1];

    if (checkerEmail !== 'u.rochester.edu' && checkerEmail !== 'rochester.edu') {
      return false;
    }
    return true;
  }
}
