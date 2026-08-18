const express = require('express')
const Main = express();

Main.set('view Engine','ejs')

var website = require('./routes/website.js')
var admin = require('./routes/admin.js')
var doctor = require('./routes/doctor.js')
var petient = require('./routes/petient.js')


Main.use('/',website)
Main.use('/admin',admin)
Main.use('/doctor',doctor)
Main.use('/petient',petient)

Main.use(express.urlencoded({extended:true}))
Main.use(express.static('public'))



Main.listen(3001,()=>{
    console.log('server started on localhost 3001 port number')
})