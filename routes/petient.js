const express = require('express')
const petient = express.Router()
const path = require('path')
const fileupload = require('express-fileupload')
const query = require('../database')




function login_check(req,res,next){
    if(req.session.Pid && req.session.Patient_name){
        next()
    }
    else{
        res.redirect('/login')
    }
}

// ========================================================================================
// ========================================================================================

petient.get('/',login_check,(req,res)=>{
    
    res.render('patient/dashboard.ejs')
})

petient.get('/profile',(req,res)=>{
    res.render('patient/profile.ejs')
})

petient.get('/appointments',(req,res)=>{
    res.render('patient/appointments.ejs')
})

petient.get('/appointments',(req,res)=>{
    res.render('patient/appointments.ejs')
})

petient.get('/treatment_history',(req,res)=>{
    res.render("patient/treatment_history.ejs")
})

petient.get('/reports',(req,res)=>{
    res.render("patient/reports.ejs")
})

petient.get('/prescriptions',(req,res)=>{
    res.render("patient/prescriptions.ejs")
})

petient.get('/payments',(req,res)=>{
    res.render("patient/payments.ejs")
})

petient.get('/notifications',(req,res)=>{
    res.render("patient/notifications.ejs")
})

petient.get('/logout',(req,res)=>{
    req.session.destroy()
    res.redirect('/login')
})


module.exports=petient