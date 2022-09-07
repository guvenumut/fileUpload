const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require('path');
const multer = require("multer");
const mongoose = require("mongoose");
const imageSchema = require("./models/imageModel");
const dotenv = require('dotenv').config()
const ejs = require('ejs')
require('./models/database')
app.use(bodyParser.urlencoded(
      { extended:true }
))
app.set('view engine', 'ejs');
app.use(express.static('uploads'))


 const port = process.env.PORT || 1337
 console.log(port);

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname  )
    }
  })

  
  const fileFilter = (req, file, cb) => {
    
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });  

 
app.get("/",(req,res)=>{
    res.render('index')
})
 
app.post("/uploadphoto",upload.single('myImage'),async(req,res)=>{
  
  let file = await imageSchema.findOne({originalName:req.file.originalname})

  if(file){
    return res.json({mesaj:'dosya var godumun'})
  }else{
    await imageSchema.create({originalName:req.file.originalname,size:req.file.size,mimetype:req.file.mimetype,
      destination:req.file.destination,
      ipAddres:req.socket.remoteAddress,userAgent:req.headers["user-agent"]})
      
      res.redirect(`/image/${req.file.originalname}`)
      
  }
  
})
app.get('/image/:originalname',(req,res)=>{
  res.sendFile(path.join(__dirname,`./uploads/${req.params.originalname}`)) 
  
  
})



app.listen(port,function () {
      console.log("Server Started at PORT 1337");
})