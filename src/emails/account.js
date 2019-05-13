const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'ahmed.mohsen.afifi@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Wecome to the app, ${name}. Let me know how you get along with the app.` //,
        // html: '' // to send am html page
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'ahmed.mohsen.afifi@gmail.com',
        subject: `Goodbye ${name}`,
        text: `Please let us know if there is anything we could have done to keep you as a customer.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}

// sgMail.send({
//     to: 'ahmed.mohsen.afifi@gmail.com',
//     from: 'ahmed.mohsen.afifi@gmail.com',
//     subject: 'This is my first creation',
//     text: 'I hope that this get to you.'
// })

// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const msg = {
//   to: 'test@example.com',
//   from: 'test@example.com',
//   subject: 'Sending with Twilio SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
// sgMail.send(msg);