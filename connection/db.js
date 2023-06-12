const mongoose = require('mongoose')    
require("dotenv").config()

const conne=mongoose.connect(process.env.mongoURL)

module.exports =conne