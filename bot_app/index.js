const { resolve } = require('path')

require('dotenv').config({
    path: resolve(__dirname, process.env.NODE_ENV === 'local' ? '..' : '', '.env')
})


const { logError } = require('./src/util/log');
const bot = require('./src/bot')
const mongoose = require('mongoose')

const {
    MONGO_DB_NAME,
    MONGO_PASSWORD,
    MONGO_PORT,
    MONGO_USERNAME,
    MONGO_HOSTNAME,
    NODE_ENV
} = process.env

// Connect to DataBase
// const mongoURL = `mongodb://${ MONGO_USERNAME }:${ MONGO_PASSWORD }@${ MONGO_HOSTNAME }:${ MONGO_PORT }/${ MONGO_DB_NAME }`
// const mongoURL = `mongodb://${ MONGO_HOSTNAME }:${ MONGO_PORT }/${ MONGO_DB_NAME }`
const mongoURL = `mongodb://mongo-rs0-1,mongo-rs0-2,mongo-rs0-3`
// const mongoURL = `mongodb://${ MONGO_HOSTNAME }:${ MONGO_PORT }`
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    dbName: 'schemedb'
}
mongoose.Promise = global.Promise
mongoose.connect(mongoURL, mongoOptions)
mongoose.connection.once('open', console.log.bind(console, '  MongoDB Connection Succeeded to schemedb'))
mongoose.connection.on('error', console.error.bind(console, '  Connection Error'))

bot.use(require('./src/middlewares'))

bot.catch(logError)


if (process.env.NODE_ENV === 'production') {

    bot.telegram.setWebhook(process.env.WEB_HOOKS_SECRET_URL)
    bot.startWebhook(process.env.WEB_HOOKS_PATH, null, process.env.PORT)

    console.info('Bot launched. mode: Webhook')
} else {

    bot.launch()

    console.info('Bot launched. mode: long-polling')
}