const { Telegraf } = require('telegraf')
const { TG_BOT_TOKEN } = process.env

const bot = new Telegraf(TG_BOT_TOKEN)

module.exports = bot