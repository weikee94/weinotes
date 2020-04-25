const sgMail = require("@sendgrid/mail");
const sendgridAPIKey = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(sendgridAPIKey);

const welcomeMail = (email, name) => {
  sgMail.send({
    to: "weikee070194@gmail.com",
    from: "weikee070194@gmail.com",
    subject: `Welcome to here ${name}`,
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  });
};

const confirmMail = (email, name) => {
  sgMail.send({
    to: "weikee070194@gmail.com",
    from: "weikee070194@gmail.com",
    subject: `Are you leaving here ${name}`,
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  });
};

module.exports = {
  welcomeMail,
  confirmMail,
};
