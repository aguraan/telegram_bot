const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    name: String,
    tel: String,
    address: {
        formatted: String,
        location: {
            lat: String,
            lng: String
        }
    },
    email: String,
    order_date: Date,
    exec_date: Date,
    payment: {
        isPaid: Boolean,
        date: Date
    },
    cost: {
        dwg: String,
        b3d: String,
        pdf: String,
        fare: String
    }
})