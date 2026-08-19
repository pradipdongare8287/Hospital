const mysql = require('mysql2');
const util = require('util');

var database = mysql.createConnection({
    user:'ul8vlqf525asrbqf',
    password:'Ur114AXv23Rofp2jyTyF',
    host:'bvuxs385ugidqk9hjd3q-mysql.services.clever-cloud.com',
    database:'bvuxs385ugidqk9hjd3q'
})

const query = util.promisify(database.query).bind(database)

module.exports=query
