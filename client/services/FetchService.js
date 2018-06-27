/**
 * @file Fetch service to standardize and simply all of our API requests.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.2
 */

export default class FetchService {
  /**
   * Sends GET request to API and validates response, resturning the data in a promise
   * @param {String} url URL for the API request.
   * @param {Object} data Any data you want to pass to the server.
   */
  static GET(url, data) {
    return fetch(url, {
      method: 'GET',
      body: data,
    }).then((res) => {
      if (res.status !== 200) {
        return Promise.reject(new Error(`Bad Status Code ${res.status}`));
      }
      return Promise.resolve(res);
    });
  }

  /**
   * Sends POST request to API and validates response, resturning the data in a promise.
   * @param {String} url URL for the API request.
   * @param {Object} data Any data you want to pass to the server.
   */
  static POST(url, data) {
    return fetch(url, {
      method: 'POST',
      body: data,
    }).then((res) => {
      if (res.status !== 200) {
        return Promise.reject(new Error(`Bad Status Code ${res.status}`));
      }
      return Promise.resolve(res);
    });
  }
}
