const TeleSignSDK = require('telesignsdk')
const {
  SMS_API_KEY,
  SMS_CUSTOMER_ID,
  SMS_REST_ENDPOINT,
  SMS_MESSAGE_TYPE,
} = process.env

const timeout = 10 * 1000 // 10 secs

const client = new TeleSignSDK(
  SMS_CUSTOMER_ID,
  SMS_API_KEY,
  SMS_REST_ENDPOINT,
  timeout // optional
  // userAgent
)

module.exports = {
  sendSMS: (phoneNumber, message) =>
    new Promise((resolve, reject) => {
      client.sms.message(
        (error, responseBody) => {
          if (error) reject(error)
          else resolve(responseBody)
        },
        phoneNumber,
        message,
        SMS_MESSAGE_TYPE
      )
    }),
}
