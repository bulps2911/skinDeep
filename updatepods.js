const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
//the below {MongoClient} is the same as the above .MongoClient
//const {MongoClient} = require("mongodb");
const uri =
  "mongodb+srv://dbAdmin:98765A321@manacluster-siac4.mongodb.net/skinDeep";


const client = new MongoClient(uri, {
  useNewUrlParser: true
  //  useUnifiedTopology: true
});
//exporting whole function
 const getprod= ()=>{
     return new Promise(async (resolve, reject)=>{
        await client.connect((err, db) => {
            if (err) {
              console.log("error: ", err);
              resolve([]);
            } else {
              const dbName = "skinDeep";
              const collectionName = "productData";
              console.log("connected to the db");
              db
                .db(dbName)
                .collection(collectionName)
                .updateMany({}, { projection: { _id: 0, shadeName: 1, imgUrl: 1 } })
                .toArray((err, result) => {
                  if (err) {
                    console.log(err);
                    db.close();
                    reject([]);
                  } else {
                    console.log("images retrieved");
                    db.close();
                    resolve(result);
                  }
                });
              client.close();
            }
          });

     })
 
};
module.exports = getprod;