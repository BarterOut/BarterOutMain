module.exports = {

  // Email sent when user gets matched with a seller
  matchFoundEmail: function matchFoundEmail(emailTo, firstName, bookTitle) {
    return {
      from: '"Barter Out" <office@barterout.com',
      to: emailTo,
      subject: 'Match found for you',
      html: `Dear    ${firstName}  ,\n 
    <br> </br> 
    We are excited to let you know that we found a <b>match</b> for your request to buy </b>   ${bookTitle}   </b>. Check it on our website and complete the purchase if you are satisfied with the price and condition of the book. <br> </br>  
    Once you click buy, we will make a request on Venmo, but not pay the seller until we verify the condition of the book. If it doesn’t match your preference, we are sending your money back. <br> </br> \n  
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

  // Email sent to seller when buyer buys their book
  emailToSeller: function emailToSeller(emailTo, firstName, bookTitle) {
    return {
      from: '"Barter Out" <office@barterout.com',
      to: emailTo,
      subject: 'We found a buyer for your book',
      html: `Dear ${firstName},\n
    <br> </br>
    We are excited to let you know that we found a <b>buyer</b> for your copy of </b>   ${bookTitle}   </b>. <b>Please drop the book</b> at one of our members anytime in the following schedule:\n
    \n  <br> </br>
    <b>Monday - Friday</b>: 11 AM - 4 PM @ the Q&I area in Rush Rhees Library.\n 
    <br> </br> 
    <b>Saturday</b>: 11 AM - 2 PM @ the Q&I area in Rush Rhees Library.\n 
    <br> </br> 
    \n  <br> </br> 
    We will check the condition of the book and if it matches the one advertised, we will send you the money via Venmo.\n <br> </br> 
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

  venmoRequestEmail: function venmoRequestEmail(emailTo, firstName, bookTitle) {
    return {
      from: '"Barter Out" <office@barterout.com',
      to: emailTo,
      subject: 'Purchase initiated',
      html: `Dear   ${firstName}  ,     <br></br>  
    \n 
    You purchased   ${bookTitle}   successfully! We will Venmo request you in the next 24 hours and the book will be delivered to you within 3 business days. <br> </br>  
    We want to make sure we are building a service that is useful to you. If you have 3-4 minutes to spare, please consider filling in our <a href="https://goo.gl/forms/KMhLK9N7ZFtHTyjF2">short survey</a>   <br></br> \n' 

    <br></br>  
    If you have any questions, feel free to send us an email at office@barterout.com!\n' 
    <br></br> <br></br>    
    Thank you,<br></br>  
    The BarterOut team<br></br> <br></br> '
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


};