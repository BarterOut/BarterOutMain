/**
 * @file Auth service to standardize and simplify all of our API requests.
 * relating to authorization.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.3
 */

import decode from 'jwt-decode';

export default class AuthService {
  // Initializing important variables
  constructor(domain) {
    this.domain = domain || 'http://localhost:8080'; // API server domain
    this.fetch = this.fetch.bind(this); // React binding stuff
    this.login = this.login.bind(this);
  }

  /**
   * Attempts to login a given user, returning the API response.
   * @param {String} emailAddress Email address of user logging in.
   * @param {String} password Password of user logging in.
   */
  login(emailAddress, password) {
    // Get a token from api server using the fetch api
    return this.fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ emailAddress, password }),
    }).then((response) => {
      this.setToken(response.data.token); // Setting the token in localStorage
      return Promise.resolve(response);
    });
  }

  /**
   * Checks if there is a (valid) user logged in on the site.
   * @returns {Boolean} Valid user logged in.
   */
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken(); // Getting token from localstorage
    if (token == null) {
      return false;
    }
    return !this.isTokenExpired(token); // handwaiving here
  }

  /**
   * Checks if there is a (admin) user logged in on the site.
   * This is used for the admin dashboard.
   * @returns {Boolean} Admin user logged in.
   */
  isAdmin() {
    const token = this.getToken();
    if (token == null) {
      return false;
    }
    if (this.getProfile().userInfo.permissionType == 1) {
      return true;
    }
    return false;
  }

  /**
   * Checks if the logged in user's session is expired.
   * @param {String} token Token of logged in user.
   */
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return true;
    }
  }

  /**
   * Adds or updates user token in session storage.
   * @param {String} idToken Token from API response.
   */
  setToken(idToken) {
    // Saves user token to localStorage
    if (!sessionStorage.getItem('token')) {
      sessionStorage.setItem('token', idToken);
    }
  }

  /**
   * Gets token from session storage.
   * @returns {String} Token or null.
   */
  getToken() {
    // Retrieves the user token from localStorage
    let token = sessionStorage.getItem('token');
    if (token != null) {
      token = token.replace(/"/g, '');
      return token;
    }
    return null;
  }

  /**
   * Logs out a user.
   */
  logout() {
    // Clear user token and profile data from localStorage
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('name');
    window.location.reload();
  }

  /**
   * Gets the profile information of a logged in user from the token.
   * @returns {Object} Profile.
   */
  getProfile() {
    // Using jwt-decode npm package to decode the token
    return decode(this.getToken());
  }

  /**
   * Generic fetch method for our API.
   * Automatically validates responses, etc.
   * @param {String} url API URL you are calling.
   * @param {Object} options HTTP header options.
   */
  fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    return fetch(url, {
      headers,
      ...options,
    })
      .then(res => this._checkStatus(res))
      .then(response => response.json());
  }

  /**
   * Checks if a given response status is OK (or some variation).
   * @param {Object} response Response object from request.
   */
  _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
      return response;
    } else {
      const error = new Error();
      error.status = response.status;
      throw error;
    }
  }
}
