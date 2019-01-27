const nodemailer = require('nodemailer');

const mailer = (options) => {
  const {
    email, message, name, company, phone,
  } = options;
  async function main() {
    const account = { user: 'paradesign.ps@gmail.com', pass: 'wood747074' };
    const output = `
<p>you have new message!!</p>
<h3>Content details</h3>
<ul>
<li>Name: ${name}</li>
<li>From: paradesign.ps@gmail.com</li>
<li>Phone: ${phone}</li>
<li>Company: ${company}</li>
</ul>
<p>${message}</p>

    `;
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: account.user,
        pass: account.pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: '"Para design" <paradesign.ps@gmail.com>',
      to: email,
      subject: 'test',
      text: 'Hi!!',
      html: output,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }

  main().catch(console.error);
};
module.exports = mailer;
