const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    tg_id: String,
    orders: Array
})