//this statement yeilds a syntax error
//import express from 'express';

//import this way
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const Jimp = require("jimp");
const fileupload = require("express-fileupload");

const multer = require("multer");
// const gsap = require("gsap");

const dotenv = require('dotenv');
dotenv.config();
//connect to db
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
//make a connection
const PASSWORD = process.env.PASSWORD || 3000;
const uri =
  "mongodb+srv://dbAdmin:98765A321@manacluster-siac4.mongodb.net/skinDeep";
// //downgraded mongodb driver
// const uri = "mongodb://dbAdmin:98765A321@manacluster-shard-00-00-siac4.mongodb.net:27017,manacluster-shard-00-01-siac4.mongodb.net:27017,manacluster-shard-00-02-siac4.mongodb.net:27017/skinDeep"
mongoose.connect(uri, { useNewUrlParser: true });
require("./models/UserData");

//routes
const prod = require("./getprods.js");
const upload = require("./upload.js");


const userData = mongoose.model("UserData");
const { MongoClient } = require("mongodb");
const app = express();


const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  //this is a function without args in es6
  console.log(`server up at ${PORT}`);
});

const client = new MongoClient(uri, {
  useNewUrlParser: true
  //  useUnifiedTopology: true
});

//initiate cors to allow access control origin on client
const corsOptions={
  origin: "*",
  optionsSuccessStatus:200,
}
app.use(cors(corsOptions));
app.use(fileupload());

//tells express to use pug
app.engine("pug", require("pug").__express);
app.set("view engine", "pug");

app.get("/", (req, res) => {
  console.log("GET request for homepage");
  res.render("upload.pug");
});

app.post("/uploadapi", (req, res, next)=>{
  // const file = req.files;
  // console.log(file);
  const file= req.files.file;
  console.log(file);
  file.mv("./public/"+file.name, (err, result)=>{
    if(err){
      console.log(err);
      return res.status(500).json(err)
      // res.status(400).send("Failed1: No image uploaded");
    } else{
      console.log("uploading");
      console.log(req.files);
      
      //create new record in mongodb
      const fullPath = "public/" + file.name;
      const b64head = "data:image/jpeg;base64,";
      const converted = new Buffer.from(fs.readFileSync(fullPath)).toString(
        "base64"
      );
      const b64 = b64head + converted;
      const imgrgb=[];
      //jimp is a promise. must finish processing first before running next thing
      Jimp.read(fullPath, (err, img)=>{
        if (err){
          console.log("jimp cannot read img");
          console.log(err);
        } else{
          img.resize(256,256)
          .scan(0,0,img.bitmap.width, img.bitmap.height,(x,y,idx)=>{
            const red = img.bitmap.data[idx+0];
            const green = img.bitmap.data[idx+1];
            const blue = img.bitmap.data[idx+2];
            if (x==img.bitmap.width -1 && y==img.bitmap.height -1){
              imgrgb.push(red.toString(), green.toString(), blue.toString());
              const document = {
                imgUrl: b64,
                rgb: imgrgb
              };
              const photo = new userData(document);
              photo.save((err, userData) => {
                try{
                  console.log("SUCCESS! img uploaded to db");
                  res.status(200).send({
                    success: true, 
                    message: "File Uploaded!",
                    rgb: photo.rgb
                  });
                }catch(err){
                  console.log(err);
                  res.send("Failed");

                }
                
              });
              
            }
          });
          console.log("img resized");
        }
      });

    }
  });
  
})

app.post("/upload", (req, res) => {
  console.log("uploading..");
  upload(req, res, err => {
    if (err) {
      console.log("cannot upload");
      console.log(err);
    } else {
      //create new record in mongodb
      const fullPath = "public/" + req.file.filename;
      const b64head = "data:image/jpeg;base64,";
      const converted = new Buffer(fs.readFileSync(req.file.path)).toString(
        "base64"
      );
      const b64 = b64head + converted;
      const imgrgb=[];
      //jimp is a promise. must finish processing first before running next thing
      Jimp.read(fullPath, (err, img)=>{
        if (err){
          console.log("jimp cannot read img");
          console.log(err);
        } else{
          img.resize(256,256)
          .scan(0,0,img.bitmap.width, img.bitmap.height,(x,y,idx)=>{
            const red = img.bitmap.data[idx+0];
            const green = img.bitmap.data[idx+1];
            const blue = img.bitmap.data[idx+2];
            const alpha = img.bitmap.data[idx+3];
            if (x==img.bitmap.width -1 && y==img.bitmap.height -1){
              imgrgb.push(red.toString(), green.toString(), blue.toString());
              const document = {
                imgUrl: b64,
                rgb: imgrgb
              };
              
              const photo = new userData(document);
        
              photo.save((err, userData) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("SUCCESS! img uploaded to db");
                  res.render("result.pug", {rgb : photo.rgb});
                }
              });
              
            }
          });
          console.log("img resized");
        }
      });
    }
  });
});


app.get("/result", (req, res) => {
  console.log("GET request for results");
  res.render("result.pug");
});

app.get("/productsapi", async (req, res) => {
  console.log("GET request for products");
  let finalResult;
  try {
    finalResult = await prod(client);
    //const finalString=[];
    const finalshade=  await `${finalResult.map(each => each.shadeName)}`;
    const finalString = await `${finalResult.map(each => each.imgUrl)}`;
    //console.log(finalString);
    const arrayfs = finalString.split(",");
    // console.log(finalString);
    console.log(finalResult);
    res.status(200).json({finalResult});
    // res.status(200).render("index.pug", { product: arrayfs });

  } catch (error) {
    finalResult = [];
    res.status(400).send("Failed");
  }
});


app.get("/products", async (req, res) => {
  console.log("GET request for products");
  let finalResult;
  try {
    finalResult = await prod(client);
    //const finalString=[];
    const finalshade=  await `${finalResult.map(each => each.shadeName)}`;
    const finalString = await `${finalResult.map(each => each.imgUrl)}`;
    //console.log(finalString);
    const arrayfs = finalString.split(",");
    // console.log(finalString);
    console.log(finalResult);
    // res.status(200).json({finalResult});
    res.status(200).render("index.pug", { product: arrayfs });

  } catch (error) {
    finalResult = [];
    res.status(400).send("Failed");
  }
});