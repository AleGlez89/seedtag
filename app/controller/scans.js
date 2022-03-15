const {httpError} = require ('../helpers/controlErrors.js')
const ScanSchema = require ('../models/scans')
const LogSchema = require ('../models/logs') 
const {getEnabledCoordinates} = require('../services/scans')

let protocolsShows,scansShows
const getScans = async (req, res) => {
    try {
        const listAll = await ScanSchema.find({})

        listAll.map(data=>{
            protocolsShows =+ data.protocols
            scansShows =+ data.scan
        })

        LogSchema.create({
            idScan: 'GetAll',
            Operation: 'GetAll',
            protocolsShows: protocolsShows,
            scansShows: scansShows
        })
        
        res.send({ count: listAll.length, items: listAll })
    } catch (e) {
        httpError(res, e)
    }
}
const getScan = async (req, res) => {
    try {
        const {id} = req.params
        const search = await ScanSchema.findById(id)  

        if(search){ 
            LogSchema.create({
                idScan: id,
                Operation: 'GetById',
                protocolsShows: Number(search.protocols),
                scansShows: Number(search.scan)
            })

            res.send(search)
        } else {
            res.status(404).send({error: 'The id '+id+ ' not found'})
        }
    } catch (e) {
        httpError(res, e)
    }
}
const createScans = async (req, res) => {
    try {
        const {protocols, scan} = req.body     
        const result = getEnabledCoordinates(protocols, scan)
        const responseCreatedScan = await ScanSchema.create({
            protocols: protocols.length,
            scan: scan.length
        })

        if(responseCreatedScan !== ''){
            const tmpId= String(responseCreatedScan._id)
            LogSchema.create({
            idScan: tmpId,
            Operation: 'Create',
            protocolsShows: responseCreatedScan.protocols,
            scansShows: responseCreatedScan.scan

        })
        }

        res.status(200).send(result)
    } catch (error) {
        httpError(res,error)        
    }
}
const deleteScans = async (req, res) => {
    try {
        const {id} = req.params
        const search = await ScanSchema.findByIdAndRemove(id)
        if(search){

            LogSchema.create({
                idScan: id,
                Operation: 'Delete',
                protocolsShows: 0,
                scansShows: 0
            })

            res.status(204).end()
        } else {
            res.status(404).send({error: 'The id '+id+ ' not found'})
        }

    } catch (error) {
        httpError(res,error)        
    }
}
const deleteAllScans = async (req, res) => {
    try {
        const listAll = await ScanSchema.deleteMany({})
        res.status(200).end()
    } catch (e) {
        httpError(res, e)
    }
}
module.exports = {getScans, getScan, createScans, deleteScans, deleteAllScans}