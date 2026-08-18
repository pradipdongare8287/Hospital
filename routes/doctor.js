const express = require('express');
const doctor = express.Router();
const path = require('path');
const fileupload = require('express-fileupload');
const session = require('express-session');

const query = require('../database');


function login_check(req,res,next){
    if(req.session.Doctor_name && req.session.Doc_id){
        next()
    }
    else{
        res.redirect('/login')
    }
}

// =========================================================================================


doctor.get('/',login_check,(req,res)=>{
    res.render('doctor/dashboard.ejs')
})

doctor.get('/profile',(req,res)=>{
    res.render('doctor/profile.ejs')
})

doctor.get('/appointments',(req,res)=>{
    res.render('doctor/appointments.ejs')
})

doctor.get('/patients',(req,res)=>{
    res.render('doctor/patients.ejs')
})

doctor.get('/treatment',(req,res)=>{
    res.render('doctor/treatment.ejs')
})

doctor.get('/prescription',(req,res)=>{
    res.render('doctor/prescription.ejs')
})
doctor.get('/reports',(req,res)=>{
    res.render('doctor/reports.ejs')
})


doctor.get('/schedule',(req,res)=>{
    res.render('doctor/schedule.ejs')
})

doctor.get('/logout',(req,res)=>{
    req.session.destroy()
    res.redirect('/login')
})




module.exports=doctor


  
  
 
