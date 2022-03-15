const mongoose = require('mongoose')

const LogSchema =  new mongoose.Schema({    
    idScan: {type: String},
    Operation:  {type: String},
    protocolsShows: {type: Number},
    scansShows: {type: Number}
}, 
{
    timestamps: true,
    versionKey: false
})
module.exports = mongoose.model('logs', LogSchema)