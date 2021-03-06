/**
 * @file File used to generate standard API response .
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

/**
 * Returns our standard HTTP response object from our API.
 * @param {Object} data Data to pass back, can be null.
 * @returns {Object} Object to send back to client as JSON.
 */
function response(data) {
  return {
    meta: {
      date: Date.now(),
      responseType: 'JSON',
      version: '0.0.4',
    },
    data,
  };
}

export default response;
