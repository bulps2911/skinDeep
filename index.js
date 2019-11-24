//this statement yeilds a syntax error
//import express from 'express';

//import this way
const express = require("express");
const fs = require("fs");
const Jimp = require("jimp");
//const UserData =  require("./models/UserData");

const dotenv = require('dotenv');
dotenv.config();
//connect to db
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
//make a connection
const PASSWORD = process.env.PASSWORD || 3000;
const uri =
  "mongodb+srv://dbAdmin:98765A321@manacluster-siac4.mongodb.net/skinDeep";
mongoose.connect(uri, { useNewUrlParser: true });
require("./models/UserData");

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error"));

//routes
const prod = require("./getprods.js");
//const prod = require("./prods.js");
const upload = require("./upload.js");

const userData = mongoose.model("UserData");
const { MongoClient } = require("mongodb");
//const userData = mongoose.model("userData", userDataSchema);
const app = express();
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  //this is a function without args in es6
  console.log(`server up at ${PORT}`);
});
//app.use(express.static('stats'));

const client = new MongoClient(uri, {
  useNewUrlParser: true
  //  useUnifiedTopology: true
});
// client.connect(uri, (err, db)=>{
//   if (err){
//     console.log(err);
//   } else{
//     console.log("connected to mongodb");
//   }

// });


//tells express to use pug
app.engine("pug", require("pug").__express);
app.set("view engine", "pug");

app.get("/", (req, res) => {
  console.log("GET request for homepage");
  res.render("upload.pug");
  //res.sendFile(__dirname + "/" + "index.html");
});

app.post("/upload", (req, res) => {
  console.log("uploading..");
  upload(req, res, err => {
    if (err) {
      console.log("cannot upload");
      console.log(err);
    } else {
      //create new record in mongodb
      //console.log(req);
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
              // console.log("red",red);
              // console.log("green",green);
              // console.log("blue", blue);
              // console.log(imgrgb);
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
                  res.redirect("/result");
                }
              });
              
            }
          });
          //res.send(img);
          //console.log(img);
          console.log("img resized");
        }
      });

    }
  });
});


app.get("/result", (req, res) => {
  console.log("GET request for results");
  res.render("result.pug");
  //res.sendFile(__dirname + "/" + "index.html");
});

app.get("/products", async (req, res) => {
  console.log("GET request for products");
  let finalResult;
  try {
    finalResult = await prod(client);
    //const finalString=[];
    const finalString = await `${finalResult.map(each => each.imgUrl)}`;
    const arrayfs = finalString.split(",");
    res.status(200).render("index.pug", { product: arrayfs });

  } catch (error) {
    finalResult = [];
    res.status(400).send("Failed");
  }
});
