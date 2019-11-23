//formidable used to parse the imgs once they reach the server
const formidable = require("formidable");
const http = require("http");
//fs used to rename the img files and to move the imgs around
const fs = require("fs");
//schema used to map out the schema of the img objt
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {MongoClient} = require("mongodb");
//multer is used to upload img to server side
const multer = require("multer");
const path = require('path');

const storageEngine=multer.diskStorage({
    destination: './public/',
    filename: (req, file, fn)=>{
        fn(null, new Date().getTime().toString()+'-'+file.fieldname+path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storageEngine,
    limits: {fileSize:200000}
}).single('userImg');

module.exports = upload;