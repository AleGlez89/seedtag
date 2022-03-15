const mongoose = require('mongoose')

const ScanSchema =  new mongoose.Schema({    
    protocols: {type: Number},
    scan:  {type: Number},
}, 
{
    timestamps: true,
    versionKey: false
})
module.exports = mongoose.model('scans', ScanSchema)