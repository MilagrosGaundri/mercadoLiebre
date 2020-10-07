const fs= require('fs');
const path = require('path');
const bcrypt =require('bcrypt');
// const {validationResult}=require('express-validator');

const dbProducts =require(path.join(__dirname,'..','data','dbProducts'));
const dbUsers =require(path.join(__dirname,'..','data','dbUsers'));

module.exports={
    register:(req,res)=>{
        res.render('userRegister',{
            title:'Registrp de usuario',
            css:'index.css'
        })
    },
    processRegister:(req,res)=>{
        let lastID = 1;
        if(dbUsers.length != 0){
            dbUsers.forEach(user=>{
                if(user.id > lastID){
                    lastID = user.id
                }
            })
        }
        let newUser={
            id: lastID +1 ,
            nombre: req.body.nombre.trim(),
            apellido:req.body.apellido.trim(),
            email:req.body.email.trim(),
            avatar:(req.files[0])?req.files[0].filename:'foto-undefined.png',
            password:bcrypt.hashSync(req.body.pass,10),
            rol:'user'
        }
        dbUsers.push(newUser)
        fs.writeFileSync(path.join(__dirname,'..','data','dbUsers.json'),JSON.stringify
        (dbUsers),'utf-8')
        return res.redirect('/users/login')
    },
    login:(req,res)=>{
        res.render('userLogin',{
            title:'Ingresá a tu cuenta',
            css:'index.css'
        })
    },
}