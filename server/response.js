/**
 * @file File used to generate standard API response .
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.3
 */

/**
 * Returns our standard HTTP response object from our API.
 * @param {String} method API method called by client.
 * @param {Object} data Data to pass back, can be null.
 * @returns {Object} Object to send back to client as JSON.
 */
function response(method, data) {
  return {
    meta: {
      date: Date.now(),
      method,
      responseType: 'JSON',
    },
    data,
  };
}

export default response;
