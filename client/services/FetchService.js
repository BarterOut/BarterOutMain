/**
 * @file FetchService.js
 * @description Fetch service to standardize and simplify all of our API requests.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

export default class FetchService {
  /**
   * Sends GET request to API and validates response, returning the data in a promise.
   * @param {String} url URL for the API request.
   */
  static GET(url) {
    return fetch(url, {
      method: 'GET',
    }).then((res) => {
      if (!FetchService._checkStatus(res)) {
        return Promise.reject(new Error(`Bad Status Code ${res.status}`));
      }
      return res.json().then(blob => Promise.resolve(blob.data));
    });
  }

  /**
   * Sends POST request to API and validates response, returning the data in a promise.
   * @param {String} url URL for the API request.
   * @param {Object} data Any data you want to pass to the server.
   */
  static POST(url, data) {
    // performs api calls sending the required authentication headers
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const options = {
      method: 'POST',
      body: JSON.stringify({ data }),
    };

    return fetch(url, {
      headers,
      ...options,
    })
      .then((res) => {
        if (!FetchService._checkStatus(res)) {
          return Promise.reject(new Error(`Bad Status Code ${res.status}`));
        }
        return res.json().then(obj => Promise.resolve(obj.data));
      });
  }

  /**
   * Checks the status code of a given response, return true or throwing an error.
   * @param {Object} response Any data you want to pass to the server.
   * @returns {Boolean} If the reponse code is good (>=200, <300)
   */
  static _checkStatus(response) {
    // Raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
      return true;
    } else {
      const error = new Error(response.status);
      error.response = response;
      throw error;
    }
  }
}
