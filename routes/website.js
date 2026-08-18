const express = require('express')
const session = require('express-session')
const website = express.Router()
const path = require('path')

website.use(express.urlencoded({extended:true}))
website.use(express.static('public'))
website.use(session({
    secret:'mykey',
    resave:false,
    saveUninitialized:true
}))

// website.use(express.urlencoded({extended:true}))
// website.use(express.static('public'))

const query = require('../database.js')


// =============================================================================


website.get('/',async(req,res)=>{
    var hospital_department = `select * from hospital_department`
    var hospital_doctors = `select * from hospital_doctors`

    let doctors = await query(hospital_doctors)
    let department = await query(hospital_department)

    res.render('index.ejs',{department:department,doctors:doctors})
})

website.get('/about',(req,res)=>{
    res.render('about.ejs')
})

website.get('/department',async(req,res)=>{
    var hospital_department = `select * from hospital_department`
    var department = await query(hospital_department)
    res.render('departments.ejs',{department:department})
})

website.get('/doctors',async(req,res)=>{
    var select_doctors = `select * from hospital_doctors`
    var doctors = await query(select_doctors)
    res.render('doctors.ejs',{doctors:doctors})
})

website.get('/services',(req,res)=>{
    res.render('services.ejs')
})

website.get('/blog',(req,res)=>{
    res.render('blog.ejs')
})

website.get('/contact',(req,res)=>{
    res.render('contact.ejs')
})

website.get('/login',(req,res)=>{
    
    res.render('login.ejs')
})

website.get('/forgot_password',(req,res)=>{
    res.render('forgot_password.ejs')
})

website.post('/access_login',async(req,res)=>{
    var {email,password}=req.body;

    var select_patient = `select * from patients where Patient_email=? and Patient_password=?`
    var select_doctor = `select * from hospital_doctors where Doctor_email=? and Doctor_password=?`
    
    var patient = await query(select_patient,[email,password])
    var doctor = await query(select_doctor,[email,password])

    if(patient[0]){
        req.session.Pid = patient[0].Pid;
        req.session.Patient_name = patient[0].Patient_name
        req.session.Patient_email = patient[0].Patient_email
        
        res.redirect('/petient')
    }
    else if(doctor[0]){
        req.session.Doc_id = doctor[0].Doc_id;
        req.session.Doctor_name = doctor[0].Doctor_name;
        req.session.Doctor_email = doctor[0].Doctor_email;

        res.redirect('/doctor')
    }
    else{
        res.redirect('/login')
    }
})

website.get('/register',(req,res)=>{
    res.render('register.ejs')
})

website.post('/register_new_patient',async(req,res)=>{
    var {Patient_name,Patient_email,Patient_phone,Patient_password,Patient_confirm_password,agree_terms}=req.body;
    var add_patient = `insert into patients(Patient_name,Patient_email,Patient_phone,Patient_password,Patient_terms_and_condition)values(?,?,?,?,?)`

    var register_patient = await query(add_patient,[Patient_name,Patient_email,Patient_phone,Patient_password,agree_terms])
    res.redirect('/login')
})

website.get('/testimonials',(req,res)=>{
    res.render('testimonials.ejs')
})
website.get('/treatment',(req,res)=>{
    res.render('treatment.ejs')
})

website.get('/book_appointment/:id',async(req,res)=>{
    var id = req.params.id;
    // res.send(id)
    var select_doctor = `select * from hospital_doctors where Doc_id=?`
    var doctor = await query(select_doctor,[id])

    res.render('appointment.ejs',{doctor:doctor[0]})
})

website.post('/website_appointment',async(req,res)=>{
    // res.send(req.body)
    var {appo_patient_name,appo_phone,appo_email,appo_department,appo_doctor,appo_date,appo_time,appo_reason}=req.body
    var insert_appintment = `insert into website_appointment(appointment_patient_name,appointment_phone,appointment_email,appointment_department,appointment_doctor,appointment_date,appointment_time,appointment_reson)values(?,?,?,?,?,?,?,?)`
    var save_web_appintment = await query(insert_appintment,[appo_patient_name,appo_phone,appo_email,appo_department,appo_doctor,appo_date,appo_time,appo_reason])

    res.redirect('/doctors')

})

website.get('/register',(req,res)=>{
    res.render('register.ejs')
})
module.exports=website