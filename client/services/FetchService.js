/**
 * @file Fetch service to standardize and simplify all of our API requests.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

export default class FetchService {
  /**
   * Sends GET request to API and validates response, returning the data in a promise.
   * @param {String} url URL for the API request.
   * @param {Object} data Any data you want to pass to the server.
   */
  static GET(url) {
    return fetch(url, {
      method: 'GET',
    }).then((res) => {
      if (!FetchService._checkStatus(res)) {
        return Promise.reject(new Error(`Bad Status Code ${res.status}`));
      }
      return Promise.resolve(res);
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
        return Promise.resolve(res);
      });
  }

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
