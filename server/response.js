/**
 * @file Pricing 'schema'. Currently only holds our fee.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.3
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
