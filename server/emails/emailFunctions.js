module.exports = {
  // Email sent when user gets matched with a seller
  matchFoundEmail: function matchFoundEmail(emailTo, firstName, bookTitle) {
    return {
      from: '"Barter Out" <office@barterout.com',
      to: emailTo,
      subject: 'Match found for you',
      html: `Dear ${firstName}, <br />
      <br />
      We are excited to let you know that we found a match for your request to buy ${bookTitle}. Check it on our <a href="https://www.barterout.com/">website</a> and complete the purchase if you are satisfied with the price and condition of the book.
      <br />
      After you click buy, we will Venmo request you as soon as we get and inspect your book, which should not take more than 2 business days. If everything is ok and you send in the payment, it will be delivered to you the following day.
      <br />
      If you have any questions, feel free to send us an email at office@barterout.com and we will reply promptly!
      <br />
      <br />
      Oh, one more thing: we are still a developing startup and want to make sure we are building a service that is useful to you. If you have 3-4 minutes to spare, please consider filling in our <a href="https://goo.gl/forms/KMhLK9N7ZFtHTyjF2">short survey</a>. We greatly value your feedback so please send us any comments or concerns.
      <br />
      <br />
      Thank you,<br />
      The BarterOut team
      <br />
      <br />
      Do you like social media as much as we do? Consider:<br />
      Liking us on <a href="https://www.facebook.com/BarterOut/">Facebook</a><br />
      Following us on <a href="https://www.instagram.com/barteroutofficial/">Instagram</a>`,
      auth: {
        user: 'office@barterout.com',
        refreshToken: '1/9XdHU4k2vwYioRyAP8kaGYfZXKfp_JxqUwUMYVJWlZs',
        accessToken: 'ya29.GluwBeUQiUspdFo1yPRfzFMWADsKsyQhB-jgX3ivPBi5zcIldvyPYZtRME6xqZf7UNzkXzZLu1fh0NpeO11h6mwS2qdsL_JREzpKw_3ebOWLNgxTyFg5NmSdStnR',
      // expires: 1484314697598
      },
    };
  },

  // Email sent to seller when buyer buys their book
  emailToSeller: function emailToSeller(emailTo, firstName, bookTitle) {
    return {
      from: '"Barter Out" <office@barterout.com',
      to: emailTo,
      subject: '[BarterOut] We found a buyer for your book',
      html: `Dear ${firstName},<br />
      <br />
      We are excited to let you know that we found a buyer for your copy of ${bookTitle}. Please drop the book as soon as you can to one of our teams members.
      <br />
      <a target="_blank" href="https://docs.google.com/spreadsheets/d/1cz-o7TdGuiopz89CZGdmuYMQrTY3H9I5VPdEdTTQoYI/edit#gid=0">Here</a> is the schedule for dropping off books.
      <br />
      We will check the condition of the book and if it matches the one advertised, we will send you the money via Venmo before delivering the book to the other student. 
      <br />
      If you have any questions, feel free to send us an email at office@barterout.com and we will reply promptly!
      <br />
      <br />
      Oh, one more thing: we are still a developing startup and want to make sure we are building a service that is useful to you. If you have 3-4 minutes to spare, please consider filling in our <a href="https://goo.gl/forms/KMhLK9N7ZFtHTyjF2">short survey</a>. We greatly value your feedback so please send us any comments or concerns.
      <br />
      <br />
      Thank you,<br />
      The BarterOut team
      <br />
      <br />
      Do you like social media as much as we do? Consider:<br />
      Liking us on <a href="https://www.facebook.com/BarterOut/">Facebook</a><br />
      Following us on <a href="https://www.instagram.com/barteroutofficial/">Instagram</a>`,
      auth: {
        user: 'office@barterout.com',
        refreshToken: '1/9XdHU4k2vwYioRyAP8kaGYfZXKfp_JxqUwUMYVJWlZs',
        accessToken: 'ya29.GluwBeUQiUspdFo1yPRfzFMWADsKsyQhB-jgX3ivPBi5zcIldvyPYZtRME6xqZf7UNzkXzZLu1fh0NpeO11h6mwS2qdsL_JREzpKw_3ebOWLNgxTyFg5NmSdStnR',
      // expires: 1484314697598
      },
    };
  },

  venmoRequestEmail: function venmoRequestEmail(emailTo, firstName, bookTitle) {
    return {
      from: '"Barter Out" <office@barterout.com',
      to: emailTo,
      subject: '[BarterOut] Purchase Initiated',
      html: `Dear ${firstName},<br />
      <br />
      You successfully purchased ${bookTitle}! We will Venmo request you as soon as we get and inspect the book, which should not take more than 2 business days. If everything is ok and you send in the payment, it will be delivered to you the following day.
      <br />
      <br />
      If you have any questions, feel free to send us an email at office@barterout.com and we will reply promptly!
      <br />
      <br />
      Oh, one more thing: we are still a developing startup and want to make sure we are building a service that is useful to you. If you have 3-4 minutes to spare, please consider filling in our <a href="https://goo.gl/forms/KMhLK9N7ZFtHTyjF2">short survey</a>. We greatly value your feedback so please send us any comments or concerns.
      <br />
      <br />
      Thank you,<br />
      The BarterOut team
      <br />
      <br />
      Do you like social media as much as we do? Consider:<br />
      Liking us on <a href="https://www.facebook.com/BarterOut/">Facebook</a><br />
      Following us on <a href="https://www.instagram.com/barteroutofficial/">Instagram</a>`,
      auth: {
        user: 'office@barterout.com',
        refreshToken: '1/9XdHU4k2vwYioRyAP8kaGYfZXKfp_JxqUwUMYVJWlZs',
        accessToken: 'ya29.GluwBeUQiUspdFo1yPRfzFMWADsKsyQhB-jgX3ivPBi5zcIldvyPYZtRME6xqZf7UNzkXzZLu1fh0NpeO11h6mwS2qdsL_JREzpKw_3ebOWLNgxTyFg5NmSdStnR',
      // expires: 1484314697598
      },
    };
  },

  // Email to ourselves when there is a transaction
  emailForUs: function emailForUs(buyerUser, sellerUser, bookFound) {
    return {
      from: '"Barter Out" <office@barterout.com',
      to: 'office@barterout.com',
      subject: '[WEBAPP] New Transaction',
      text: `Match found!
      \n
      Date: ${new Date()}
      \n
      Book: ${bookFound.name}
      Condition: ${bookFound.condition}
      Price: ${bookFound.price}
      \n
      Seller: ${sellerUser.firstName} ${sellerUser.lastName}
      Email: ${sellerUser.emailAddress}
      Venmo: ${sellerUser.venmoUsername}
      \n
      Buyer: ${buyerUser.firstName} ${buyerUser.lastName}
      Email: ${buyerUser.emailAddress}
      Venmo: ${buyerUser.venmoUsername}
      CMC Box Number: ${buyerUser.CMC}
      `,
      auth: {
        user: 'office@barterout.com',
        refreshToken: '1/9XdHU4k2vwYioRyAP8kaGYfZXKfp_JxqUwUMYVJWlZs',
        accessToken: 'ya29.GluwBeUQiUspdFo1yPRfzFMWADsKsyQhB-jgX3ivPBi5zcIldvyPYZtRME6xqZf7UNzkXzZLu1fh0NpeO11h6mwS2qdsL_JREzpKw_3ebOWLNgxTyFg5NmSdStnR',
      // expires: 1484314697598
      },
    };
  },
  verifyEmail: function verifyEmail(emailTo, firstName, URL) {
    return {
      from: '"Barter Out" <office@barterout.com',
      to: emailTo,
      subject: '[BarterOut] Please Verify your Email',
      html: `Dear ${firstName},<br />
      <br />
      Thank you for signing up for our services. Please click on the following link to confirm your email and start using BarterOut today on our website by putting a textbook up for sale or buying one from another student.
      <br />
      <br />
      <b><a href=http://www.barterout.com/api/auth/email-verification/${URL}>CONFIRM EMAIL</a></b>
      <br />
      <br />
      This version is currently available only at the University of Rochester and does not have all features implemented. If you know anyone looking to buy or sell used textbooks, feel free to invite them to join our platform.
      <br />
      <br />
      If you have any questions, feel free to send us an email at office@barterout.com and we will reply promptly!
      <br />
      <br />
      Oh, one more thing: we are still a developing startup and want to make sure we are building a service that is useful to you. If you have 3-4 minutes to spare, please consider filling in our <a href="https://goo.gl/forms/KMhLK9N7ZFtHTyjF2">short survey</a>. We greatly value your feedback so please send us any comments or concerns.
      <br />
      <br />
      Thank you,<br />
      The BarterOut team
      <br />
      <br />
      Do you like social media as much as we do? Consider:<br />
      Liking us on <a href="https://www.facebook.com/BarterOut/">Facebook</a><br />
      Following us on <a href="https://www.instagram.com/barteroutofficial/">Instagram</a>`,
      auth: {
        user: 'office@barterout.com',
        refreshToken: '1/9XdHU4k2vwYioRyAP8kaGYfZXKfp_JxqUwUMYVJWlZs',
        accessToken: 'ya29.GluwBeUQiUspdFo1yPRfzFMWADsKsyQhB-jgX3ivPBi5zcIldvyPYZtRME6xqZf7UNzkXzZLu1fh0NpeO11h6mwS2qdsL_JREzpKw_3ebOWLNgxTyFg5NmSdStnR',
        // expires: 1484314697598
      },
    };
  },

  signedUpEmail: function signedUpEmail(emailTo, firstName) {
    return {
      from: '"Barter Out" <office@barterout.com',
      to: emailTo,
      subject: '[BarterOut] Thank you for Signing Up!',
      html: `Dear ${firstName},<br />
      <br />
      Thank you for confirming your email and becoming a member of our community. Start using BarterOut today on our <a href="https://www.barterout.com/">website</a> by putting a textbook up for sale or buying one from another student.
      <br />
      <br />
      If you have any questions, feel free to send us an email at office@barterout.com and we will reply promptly!
      <br />
      <br />
      Thank you,<br />
      The BarterOut team
      <br />
      <br />
      Do you like social media as much as we do? Consider:<br />
      Liking us on <a href="https://www.facebook.com/BarterOut/">Facebook</a><br />
      Following us on <a href="https://www.instagram.com/barteroutofficial/">Instagram</a>`,
      auth: {
        user: 'office@barterout.com',
        refreshToken: '1/9XdHU4k2vwYioRyAP8kaGYfZXKfp_JxqUwUMYVJWlZs',
        accessToken: 'ya29.GluwBeUQiUspdFo1yPRfzFMWADsKsyQhB-jgX3ivPBi5zcIldvyPYZtRME6xqZf7UNzkXzZLu1fh0NpeO11h6mwS2qdsL_JREzpKw_3ebOWLNgxTyFg5NmSdStnR',
        // expires: 1484314697598
      },
    };
  },

  passwordResetEmail: function passwordResetEmail(emailTo, firstName, URL) {
    return {
      from: '"Barter Out" <office@barterout.com',
      to: emailTo,
      subject: '[BarterOut] Reset Password',
      html: `Dear ${firstName}, <br></br>
      \n
      This email has been sent to reset your password.
      <br></br>
      Please click <a href=http://www.barterout.com/api/auth/passwordReset/${URL}>this link</a> in order to continue.
      <br> </br>
      If you know anyone looking to buy or sell used textbooks, feel free to invite them to join our platform in this beta version.
      <br> </br> \n
      <br></br>
      If you have any questions, feel free to send us an email at office@barterout.com!\n
      <br></br> <br></br>
      Thank you,<br></br>
      The BarterOut team<br></br> <br></br>
      \n
      Like us on <a href="https://www.facebook.com/BarterOut/" target="_blank">Facebook</a> <br> </br> Follow us on <a href="https://www.instagram.com/barteroutofficial/" target="_blank">Instagram</a>`,
      auth: {
        user: 'office@barterout.com',
        refreshToken: '1/9XdHU4k2vwYioRyAP8kaGYfZXKfp_JxqUwUMYVJWlZs',
        accessToken: 'ya29.GluwBeUQiUspdFo1yPRfzFMWADsKsyQhB-jgX3ivPBi5zcIldvyPYZtRME6xqZf7UNzkXzZLu1fh0NpeO11h6mwS2qdsL_JREzpKw_3ebOWLNgxTyFg5NmSdStnR',
        // expires: 1484314697598
      },
    };
  },
};
