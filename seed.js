var User = require('./models/user')
var OilType = require('./models/oiltype')
var mongoose = require("mongoose");
//mongo connection
mongoose.connect('mongodb://127.0.0.1:27017/khalisgroup-web')
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
    console.log('Successfully connected to MongoDB server!')
})

var data = [


    { "oilName": "Soyabean Oil", "shipmentType": "oil" },
    { "oilName": "Palm Olein", "shipmentType": "oil" },
    { "oilName": "Canola Seed", "shipmentType": "seed" },
    { "oilName": "Sunflower Seed", "shipmentType": "seed" },
    { "oilName": "Rape Seed", "shipmentType": "seed" },
    { "oilName": "Soyabean Seed", "shipmentType": "seed" },
    { "oilName": "RBD Palm Oil", "shipmentType": "oil" },


    { "oilName": "Soyabean Oil", "shipmentType": "oil", 'shipmentAvg': 'average' },
    { "oilName": "Palm Olein   ", "shipmentType": "oil", 'shipmentAvg': 'average' },
    { "oilName": "Canola Seed", "shipmentType": "seed", 'shipmentAvg': 'average' },
    { "oilName": "Sunflower Seed", "shipmentType": "seed", 'shipmentAvg': 'average' },
    { "oilName": "Rape Seed", "shipmentType": "seed", 'shipmentAvg': 'average' },
    { "oilName": "Soyabean Seed", "shipmentType": "seed", 'shipmentAvg': 'average' },
    { "oilName": "RBD Palm Oil", "shipmentType": "oil", 'shipmentAvg': 'average' },

]

data.forEach(function (d) {
    OilType.collection.insert(d)
})

// async function getOil() {
//     try {
//         let users = await User.find({})
//         let oils = await OilType.find({})
//         console.log(users)
//         console.log('===========')
//         console.log(oils)
//     } catch (error) {
//         console.log(error)
//     }

// }
// getOil()