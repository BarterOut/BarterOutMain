var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');


//Ideally I would say that the configurations aka the main authentication (email and password) should be left in a
//config file kind of place
//then we can migrate the transporter aka transporter = nodemailer.createTransport to the server.js file
// and call the methods from there. I can do that but currently I do not have the email or passowrd so I'm going to go to bed
//For more information about how you would do this check this video: https://www.youtube.com/watch?v=TCs7_4A2Hpk





//This is for the secure log in: I dont have the credentials right now so I cant configure it.
//Follow this tutorial and you will basically be able to know what to put here: https://www.youtube.com/watch?v=JJ44WA_eV8E
//Text vertsion of the tutorial~~ kinda http://masashi-k.blogspot.com/2013/06/sending-mail-with-gmail-using-xoauth2.html
//For more reference see this:  https://www.youtube.com/watch?v=TCs7_4A2Hpk

// generator.on('token', function(token){
//     console.log('New token for %s: %s', token.user, token.accessToken);
// });

// let transporter = nodemailer.createTransport({//secure authentication
//     host: 'smtp.gmail.com',
//     port: 465,//Need to change this
//     secure: true,
//     auth: {
//         xoauth2: xoauth2.createXOAuth2Generator({
//             user: 'office@barterout.com',
//             clientId: '878736426892-d0vbth6ho78opo916rr1bimlmuufq25e.apps.googleusercontent.com',
//             clientSecret: '5OTf_iLhmt0tjJCKIdnuC5XM',
//             refreshToken: '1/9XdHU4k2vwYioRyAP8kaGYfZXKfp_JxqUwUMYVJWlZs',
//             //accessToken: '{cached access token}'
//         })
//     }
// });



let transporter = nodemailer.createTransport({
    service: 'Gmail',
    // secure: false,
    // port: 42,//this needs to be changed
    auth:{
        user: 'baterout@barterout.com', // I dont know the barter out email
        pass: 'barterOutPassword' //This is where the barter out password would go

    },
    // tls: {
    //     rejectUnauthorized: false
    // }
});

let options = {
    from: '"Barter Out" <barterout@barterout.com',
    to: 'barterout@barterout.com',
    subject: 'Hello',
    text: 'we got an email'

}

transporter.sendMail(options,(err,info)=>{
    if(error){
        console.log(err);
    }
    console.log("The message was sent!");
    console.log(info);

});

//This function allows you to change the options. Meaning that you can  then call this function and it should
//automatically be able to send the emails to the specified address. This is useful becasue it can be called every time
//that we want to send an email.
function changeOptions(emailTo, subject, text){

    let options = {
        from: '"Barter Out" <barterout@barterout.com',
        to: emailTo,
        subject: subject,
        text: text

    }
}



// transporter.sendMail({
//     from: 'sender@example.com',
//     to: 'recipient@example.com',
//     subject: 'Message',
//     text: 'I hope this message gets through!',
//     auth: {
//         user: 'user@example.com',
//         refreshToken: '1/XXxXxsss-xxxXXXXXxXxx0XXXxxXXx0x00xxx',
//         accessToken: 'ya29.Xx_XX0xxxxx-xX0X0XxXXxXxXXXxX0x',
//         expires: 1484314697598
//     }
// });
//

