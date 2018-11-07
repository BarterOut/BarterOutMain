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
    let valid = true;
    if (p1 != p2) {
      valid = false;
    }
    return { valid, strength: this.getPasswordStrength(p1) };
  }

  /**
   * Returns a value from 1-10 denoting password strength,
   * 1-worst 10-best.
   * @param {String} password Password to check.
   */
  getPasswordStrength(password) {
    if (password.length > 6) {
      return 5;
    }
    return 1;
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
