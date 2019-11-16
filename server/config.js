/**
 * @file config.js
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @author Daniel Munoz
 * @author Shawn Chan
 * @author Luis Nova
 * @version 0.0.4
 */

/**
 * Status 0: a book that is posted and ready to sell
 * Status 1: someone clicked buy on the website
 * Status 2: We have verified the condition of the book and charged the buyer
 * Status 3: the book has been delivered and we paid the seller
 * Status 4: Not in use
 * Status 5: The book has been unlisted and set as inactive
*/

const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost/barterout-db',
  port:     process.env.PORT || 8080,
  key:      process.env.JWT_SECRET || 'secret',
  VALID_STATUSES: {
    LISTED:      0,
    STAGE_ONE:   1,
    STAGE_TWO:   2,
    STAGE_THREE: 3,
    UNLISTED:    5,
  },
};

export default config;
