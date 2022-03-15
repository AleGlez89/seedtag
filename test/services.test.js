const supertest = require('supertest')
const mongoose = require ('mongoose')
const {app, server} = require('../app')
const Scan = require ('../app/models/scans')
const Log = require ('../app/models/logs')
const api = supertest(app)

const initialScan = [
  {  
    protocols: 1,
    scan:  10
  },
  {
   protocols: 2,
   scan:  20
  }
]

test('services get_scan return json', async () => {
await api
    .get('/seedtag/v1/scans')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
test('check only 2 element in get_scans', async () => {
 const response = await api.get('/seedtag/v1/scans')
 expect(response.body.items).toHaveLength(initialScan.length)
})
test('the max protocols in firts scan is 1 ', async () => {
    const response = await api.get('/seedtag/v1/scans')
    expect(response.body.items[0].protocols) === 1
})

//Event in running test
beforeEach(async ()=>{
    await Scan.deleteMany({})
    await Log.deleteMany({})
    const scan1 = new Scan(initialScan[0])
    await scan1.save()
    const scan2 = new Scan(initialScan[1])
    await scan2.save()
})
afterAll(()=>{
await Scan.deleteMany({})
mongoose.connection.close()
server.close()
})