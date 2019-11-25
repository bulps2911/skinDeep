const getresult= (client)=>{
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
               .find({}, { projection: { _id: 0, shadeName: 1, imgUrl: 1 } }).sort( {shadeName:1})
               .toArray((err, result) => {
                 if (err) {
                   console.log(err);
                   // db.close();
                   reject([]);
                 } else {
                   console.log("images retrieved");
                   // db.close();
                   resolve(result);
                 }
               });
             // client.close();
           }
         });

    })

};
module.exports = getresult;