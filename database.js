const mysql = require('mysql2');
const util = require('util');

var database = mysql.createConnection({
    user:'root',
    password:'root',
    host:'localhost',
    database:'hospital_2'
})

const query = util.promisify(database.query).bind(database)

module.exports=query