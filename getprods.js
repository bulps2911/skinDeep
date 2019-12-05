//exporting whole function
const getprod = client => {
  const timer = new Date();
  const ehe =
    "time start: " +
    timer.getHours() +
    ":" +
    timer.getMinutes() +
    ":" +
    timer.getSeconds() +
    ":" +
    timer.getUTCMilliseconds();
  console.log(ehe);
  return new Promise(async (resolve, reject) => {
    await client.connect((err, db) => {
      if (err) {
        console.log("error: ", err);
        resolve([]);
      } else {
        const timer1 = new Date();
        const minus = timer1-timer;
        const ehe1 =
          (timer1.getHours()-timer.getHours()) +
          ":" +
          (timer1.getMinutes()-timer.getMinutes()) +
          ":" +
          (timer1.getSeconds()-timer.getSeconds()) +
          ":" +
          (timer1.getMilliseconds()-timer.getMilliseconds());
        console.log("time connect db: " , minus);
        console.log("connec to db", timer1.getHours()+":"+timer1.getMinutes()+":"+timer1.getSeconds()+":"+timer1.getMilliseconds());
        const dbName = "skinDeep";
        const collectionName = "productData";
        console.log("connected to the db");
        db.db(dbName)
          .collection(collectionName)
          .find({}, { projection: { _id: 0, shadeName: 1, imgUrl: 1 } })
          .sort({ shadeName: 1 })
          .toArray((err, result) => {
            if (err) {
              console.log(err);
              // db.close();
              reject([]);
            } else {
              const timer2 = new Date();
              const minus2 = timer2-timer1;
              const ehe2 =
                (timer2.getHours()-timer1.getHours()) +
                ":" +
                (timer2.getMinutes()-timer1.getMinutes()) +
                ":" +
                (timer2.getSeconds()-timer1.getSeconds()) +
                ":" +
                (timer2.getMilliseconds()-timer1.getMilliseconds());
              
                console.log("time retrieve data: ", minus2);
              console.log("time retrieve data: ", ehe2);
              console.log("retrieve data", timer2.getHours()+":"+timer2.getMinutes()+":"+timer2.getSeconds()+":"+timer2.getMilliseconds());
              
              console.log("images retrieved");
              // console.log(result);
              // db.close();
              // console.log("HERE");
              // console.log(result);
              //resolve is the last thing the func should do
              //used to complete the promise. end promises by eiter resolving or rejecting
              resolve(result);
            }
          });
        // client.close();
      }
    });
  });
};
module.exports = getprod;
