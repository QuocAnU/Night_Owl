const mongoose = require('mongoose')
async function connect() {
    try {
        await mongoose.connect(process.env.DB)
        console.log('Connect successfully')
    } catch (error) {
        console.error('Connect failure')
    }
}

module.exports = { connect }
