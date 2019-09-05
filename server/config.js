/**
 * @file config.js
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @author Daniel Munoz
 * @author Shawn Chan
 * @author Luis Nova
 * @version 0.0.4
 */


/**
 * Status 0 is: a book that is posted and ready to sell
 * Status 1 is: someone clicked buy on the website
 * Status 2 is: We have verified the condition of the book and charged the buyer
 * Status 3 is: the book has been delivered and we paid the seller
 * Status 4 is: ???
 * Status 5 is: The book has been unlisted and set as inactive
*/

const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost/barterout-db',
  port: process.env.PORT || 8080,
  key: process.env.JWT_SECRET,
  statuses: [0, 1, 2, 3, 4, 5],
};

export default config;
