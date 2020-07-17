const nodemailer = require('nodemailer')
const axios = require('axios')
const url = require('url')
const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN,
    GOOGLE_TOKEN_URI,
    EMAIL_ADMIN,
    EMAIL_ADDRESS
} = process.env
// const {
//     google,
//     EMAIL_ADMIN,
//     EMAIL_ADDRESS
// } = require('../../config.json')

let accessToken = ''

const transporter = nodemailer.createTransport({ 
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2'
    }
})

transporter.set('oauth2_provision_cb', (user, renew, callback) => {
    if (renew) {
        generateAccessToken()
            .then(({ data }) => {
                accessToken = data.access_token
                callback(null, accessToken)
            })
            .catch(callback)
    } else {
        callback(null, accessToken)
    }
})

function generateAccessToken() {
    const params = new url.URLSearchParams({
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        grant_type: 'refresh_token',
        refreshToken: GOOGLE_REFRESH_TOKEN
    })
    return axios.post(GOOGLE_TOKEN_URI, params.toString())
}

function sendMail(options) {
    const base = {
        from: `"🤖 Telegram bot" ${ EMAIL_ADDRESS }`,
        generateTextFromHTML: true,
        auth: {
            user: EMAIL_ADMIN
        }
    }
    return transporter.sendMail({
        ...base,
        ...options
    })
}

module.exports = {
    sendMail
}
