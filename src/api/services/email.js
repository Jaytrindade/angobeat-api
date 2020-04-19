const nodemailer = require('nodemailer')
const {
  EMAIL_USE_SERVICE,
  EMAIL_SMTP_HOST,
  EMAIL_SMTP_PORT,
  EMAIL_SMTP_SECURE,
  EMAIL_IMAP_HOST,
  EMAIL_IMAP_PORT,
  EMAIL_IMAP_SECURE,
  EMAIL_POP3_HOST,
  EMAIL_POP3_PORT,
  EMAIL_POP3_SECURE,
  APLICATION_EMAIL,
  API_EMAIL,
  API_EMAIL_PASSWORD,
} = process.env

const getEmailService = (use) => {
  use = use.toLowerCase()
  let account = { user: API_EMAIL, pass: API_EMAIL_PASSWORD }
  if (use === 'smtp') {
    account = {
      ...account,
      host: EMAIL_SMTP_HOST,
      port: Number(EMAIL_SMTP_PORT),
      secure: EMAIL_SMTP_SECURE === 'true',
    }
  }
  if (use === 'imap') {
    account = {
      ...account,
      host: EMAIL_IMAP_HOST,
      port: Number(EMAIL_IMAP_PORT),
      secure: EMAIL_IMAP_SECURE === 'true',
    }
  }
  if (use === 'pop3') {
    account = {
      ...account,
      host: EMAIL_POP3_HOST,
      port: Number(EMAIL_POP3_PORT),
      secure: EMAIL_POP3_SECURE === 'true',
    }
  }
  return account
}

const htmlEmail = (opts) => {
  if (opts.type === 'auth') {
    return `
    <body style="width: 100%; height: 100%; background: #fff; padding: 20px; box-sizing: border-box; margin: 0;">
      <h1 style="display: block; font: 500 20px sans-serif;">Olá ${opts.name}! Tudo bem?</h1>
      <p style="display: block; width: 100%; box-sizing: border-box; font-size: 16px; margin: 15px 0;">
        Bom, a gente está muito bem e super feliz por você fazer parte da <a href="#" style="text-decoration: none;">AngoBeat</a>,<br>
        esperamos de coração que você desfrute de tudo que a <a href="#" style="text-decoration: none;">AngoBeat</a>
        oferece.
      </p>
      <p style="display: block; width: 100%; box-sizing: border-box; font-size: 14px; margin: 15px 0;">
        <p style="display: block; margin: 0; font-size: 14px;">Aqui está o link para confirmar o seu email: </p>
        <a href="${opts.link}"
          style="font-size: 13px; text-decoration: none; margin: 10px 0;"
        target="_blank">${opts.link}</a>
      </p>
    </body>
  `
  }
}

// send email function
const sendEmail = async (data, qtyTry) => {
  const account = getEmailService(EMAIL_USE_SERVICE)

  const transporter = nodemailer.createTransport({
    host: account.host,
    port: account.port,
    secure: account.secure,
    auth: {
      user: account.user,
      pass: account.pass,
    },
  })
  if (qtyTry <= 0) console.log(data.opts.link)

  // setup email data with unicode symbols
  const mailOptions = {
    from: APLICATION_EMAIL, // sender address
    to: data.to, // list of receivers
    subject: data.subject, // Subject line
    text: data.text, // plain text body
    html: htmlEmail(data.opts), // html body
  }

  // send mail with defined transport object
  await transporter.sendMail(mailOptions)
}

module.exports = { sendEmail }
