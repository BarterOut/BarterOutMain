/**
 * @file FetchService.js
 * @description Fetch service to standardize and simplify all of our API requests.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import AuthService from './AuthService';
import ErrorService from './ErrorService';

export default class FetchService {
  /**
   * Sends GET request to API, returning any data
   * or erros in a promise.
   * @param {String} url URL for the API request.
   * @param {Boolean} authFlag Send Authorization header?
   */
  static GET(url, authFlag = true) {
    const options = {
      method: 'GET',
    };

    return FetchService.fetch(
      url,
      options,
      authFlag,
    )
      .then(data => Promise.resolve(data))
      .catch(error => Promise.reject(error));
  }

  /**
   * Sends POST request to API, returning any data
   * or erros in a promise.
   * @param {String} url URL for the API request.
   * @param {Object} data Any data you want to pass to the API.
   * @param {Boolean} authFlag Send Authorization header?
   */
  static POST(url, data, authFlag = true) {
    const options = {
      method: 'POST',
      body: JSON.stringify({ data }),
    };


    return FetchService.fetch(
      url,
      options,
      authFlag,
    )
      .then(data => Promise.resolve(data))
      .catch(error => Promise.reject(error));
  }

  /**
   * Sends PUT request to API, returning any data
   * or erros in a promise.
   * @param {String} url URL for the API request.
   * @param {Object} data Any data you want to pass to the API.
   * @param {Boolean} authFlag Send Authorization header?
   */
  static PUT(url, data, authFlag = true) {
    const options = {
      method: 'PUT',
      body: JSON.stringify({ data }),
    };

    return FetchService.fetch(
      url,
      options,
      authFlag,
    )
      .then(data => Promise.resolve(data))
      .catch(error => Promise.reject(error));
  }

  /**
   * Generic fetch method for our API.
   * Automatically validates responses, etc.
   * @param {String} url API URL you are calling.
   * @param {Object} options HTTP header options.
   * @param {Boolean} authFlag Send Authorization header to API.
   */
  static fetch(url, options, authFlag) {
    const headers = authFlag
      ? {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AuthService.getToken()}`,
      }
      : {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };

    return fetch(url, {
      headers,
      ...options,
    })
      .then((res) => {
        if (!FetchService._checkStatus(res)) {
          return res.json()
            .then(blob => Promise.reject(ErrorService.parseError(blob)));
        }
        return res.json().then(blob => Promise.resolve(blob.data));
      });
  }

  /**
   * Checks the status code of a given response
   * @param {Object} response API respoonse.
   * @returns {Boolean} If the reponse code is good
   * (>=200, <300) or not (> 300)
   */
  static _checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return true;
    }
    return false;
  }
}
