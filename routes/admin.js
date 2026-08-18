const express = require('express')
const session = require('express-session')
const fileupload = require('express-fileupload')
const path = require('path')
const admin = express.Router()

admin.use(express.urlencoded({extended:true}));
admin.use(express.static('public'));
const query = require('../database.js')


admin.use(fileupload())

admin.use(session({
    resave:false,
    secret:'mykey',
    saveUninitialized:true,
    rolling: true,
    cookie: {
        maxAge: 20 * 60 * 1000   // 20 मिनिटे (Milliseconds)
    }
}))

function stay_user(req,res,next){
    if(req.session.id && req.session.email ){
        next()
    }
    else{
        res.redirect('/admin/login')
    }
}

        // ===DATA BASE ===



// ==================================================================
admin.get('/',stay_user,(req,res)=>{
    res.render('admin/dashboard.ejs')
})

admin.get('/login',(req,res)=>{
    res.render('admin/login.ejs')
})

admin.post('/Check_login',async(req,res)=>{
    var {email,password}=req.body;
    var select = `select * from admin_login where Email=? and Password=?`
    var sql = await query(select,[email,password])

    // res.send(sql[0])
    if(sql[0]){
        req.session.id = sql[0].A_id;
        req.session.email = sql[0].Email;
        res.redirect('/admin')
    }
    else{
        res.redirect('/admin/login')
    }
})
admin.get('/doctors',async(req,res)=>{
    var doctors = `select * from hospital_department`
    var doctors2 = `select * from hospital_doctors`

    var sql1 = await query(doctors)
    var sql2 = await query(doctors2)

    res.render('admin/doctors.ejs',{department:sql1,doctors:sql2})
})

admin.get('/patient',async(req,res)=>{
    var select_patient = `select * from patients`
    var patients = await query(select_patient)
    res.render('admin/patients.ejs',{patients:patients})
    
})

admin.post('/add_patient',async(req,res)=>{
    // res.send(req.body)
    var {patient_name,patient_email,patient_phone,patient_age,patient_gender,patient_bloodGroup,patient_address,patient_status,patient_add_date}=req.body;
    var add_patient = `insert patients (Patient_name,Patient_email,Patient_phone,Patient_age,Patient_gender,Patient_bloodGroup,patient_address,patient_status,Patient_add_date)values(?,?,?,?,?,?,?,?,?)`
    var patient_save = await query(add_patient,[patient_name,patient_email,patient_phone,patient_age,patient_gender,patient_bloodGroup,patient_address,patient_status,patient_add_date])
    res.redirect('/admin/patient')
})

admin.get('/appointments',(req,res)=>{
    res.render('admin/appointments.ejs')
})

admin.get('/departments',async(req,res)=>{
    var departments = `select * from hospital_department`;
    var sql1 = await query(departments)
    res.render('admin/departments.ejs',{departments:sql1})
    // console.log(sql1)
})

admin.get('/treatments',async(req,res)=>{
    var select_department = `select * from hospital_department`
    var select_treatment = `select * from treatment`


    var department = await query(select_department)
    var treatment = await query(select_treatment)

    res.render("admin/treatments.ejs",{department:department,treatment:treatment})
})

admin.post('/save_treatment',async(req,res)=>{
    // res.send(req.body)
    
    var {tret_name,tret_department,tret_duration,tret_price,tret_description,tret_status}=req.body;

    var treatment_image = req.files.tret_image
    var newimagename = Date.now()+treatment_image.name
    var save_imagepath = path.join(__dirname,'../','public/images',newimagename)
    
    treatment_image.mv(save_imagepath,(err)=>{})
    
    var save_treatment = `insert into treatment (t_name,tret_Department_id,tret_Duration,tret_Price,tret_Description,tret_Status,tret_image)values(?,?,?,?,?,?,?)`

    var insert = await query(save_treatment,[tret_name,tret_department,tret_duration,tret_price,tret_description,tret_status,newimagename])

    res.redirect('/admin/treatments')


})

admin.get('/delete_treatement/:id',async(req,res)=>{
    var id = req.params.id;
    var delete_treatement = `delete from treatment where tid=?`
    var tretment_remove = await query(delete_treatement,[id])
    res.redirect('/admin/treatments')
})



admin.get('/medicines',(req,res)=>{
    res.render('admin/medicines.ejs')
})
admin.get('/settings',(req,res)=>{
    res.render('admin/settings.ejs')
})

admin.get('/reports',(req,res)=>{
    res.render('admin/reports.ejs')
})

admin.post('/add_department',async(req,res)=>{
    var {department_icon,department_name,doctors,beds,department_description}=req.body;
    var insert_department = `insert into hospital_department(Department_icon,Department_name,Doctors,Beads,Department_discription)values(?,?,?,?,?)`
    var sql1 = await query(insert_department,[department_icon,department_name,doctors,beds,department_description])
    res.redirect('/admin/departments')
})

admin.get('/Edit_department/:id',async(req,res)=>{
    var id = req.params.id;
    var select_update_department = `select * from hospital_department where Did=? `
    var sql1 = await query(select_update_department,[id]);
    
    res.render('admin/update_department.ejs',{update_department:sql1[0]})
})
admin.get('/Delete_department/:id',async(req,res)=>{
    var id = req.params.id;
    var delete_department = `delete from hospital_department where Did=?`
    var sql1 = await query(delete_department,[id]);
    res.redirect('/admin/departments')
    
})

admin.post('/update_department/:id',async(req,res)=>{
    var id = req.params.id;
    var {department_icon,department_name,doctors,beds,department_description}=req.body;
    var update_hospital_department = `update hospital_department set Department_icon=?,Department_name=?,Doctors=?,Beads=?,Department_discription=? where Did=?`
    var sql1 = await query(update_hospital_department,[department_icon,department_name,doctors,beds,department_description,id])

    res.redirect('/admin/departments')
})

admin.post('/add_doctor',async(req,res)=>{
    var {doctor_name,
        speciality,
        department,
        experience,
        rating,
        treat_patient,
        Doctore_fee,
        Doctor_gender,
        Doctore_email,
        Doctore_password,
        Doctore_mobile
    }=req.body;
    var doctor_image = req.files.doctor_photo;
    var image_name = Date.now()+doctor_image.name;
    var image_location = path.join(__dirname,'../','public/images',image_name);
    doctor_image.mv(image_location,(err)=>{})
    
    var add_doctor = `insert into hospital_doctors (Doctor_specility,Doctor_department,Doctor_expirence,Doctor_rating,Doctor_treat_patient,Doctor_Fee,Doctor_name,Doctor_image,Doctor_gender,Doctor_email,Doctor_password,Doctor_mobile)values(?,?,?,?,?,?,?,?,?,?,?,?)`
    var sql1 = await query(add_doctor,[speciality,department,experience,rating,treat_patient,Doctore_fee,doctor_name,image_name,Doctor_gender,Doctore_email,Doctore_password,Doctore_mobile])
    
    res.redirect('/admin/doctors')
})


admin.get('/delete_doctor/:id',async(req,res)=>{
    var id = req.params.id;
    var delete_doctor = `delete from hospital_doctors where doc_id=?`
    var delte1 = await query(delete_doctor,[id]);
    
    res.redirect('/admin/doctors')
})
module.exports=admin