const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://dbAdmin:lolomgwtfkthxbai666@manacluster-siac4.mongodb.net/test";
//"mongodb+srv://dbAdmin:lolomgwtfkthxbai666@manacluster-siac4.mongodb.net/test?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true
  //  useUnifiedTopology: true
});
client.connect((err, db) => {
  if (err) {
    console.log("error: ", err);
  } else {
    const dbName = "skinDeep";
    const collectionName = "productData";
    //   const docuIn = [
    //     { shadeNo: "4", shadeName: "120", imgUrl: "https://i.ibb.co/jDh1s5J/4.jpg", lab: "" },
    //     { shadeNo: "5", shadeName: "130", imgUrl: "https://i.ibb.co/DgvxRL2/5.jpg", lab: "" },
    //     { shadeNo: "6", shadeName: "140", imgUrl: "https://i.ibb.co/KmXzQNR/6.jpg", lab: "" },
    //     { shadeNo: "7", shadeName: "145", imgUrl: "https://i.ibb.co/gdtJYrs/7.jpg", lab: "" },
    //     { shadeNo: "8", shadeName: "150", imgUrl: "https://i.ibb.co/DggLwrG/8.jpg", lab: "" },
    //     { shadeNo: "9", shadeName: "160", imgUrl: "https://i.ibb.co/pd13FRS/9.jpg", lab: "" },
    //     { shadeNo: "10", shadeName: "170", imgUrl: "https://i.ibb.co/C2mg10d/10.jpg", lab: "" },
    //     { shadeNo: "11", shadeName: "180", imgUrl: "https://i.ibb.co/xzvkrZm/11.jpg", lab: "" },
    //     { shadeNo: "12", shadeName: "185", imgUrl: "https://i.ibb.co/pdvSdxW/12.jpg", lab: "" },
    //     { shadeNo: "13", shadeName: "190", imgUrl: "https://i.ibb.co/WyHM8JX/13.jpg", lab: "" },
    //     { shadeNo: "14", shadeName: "200", imgUrl: "https://i.ibb.co/LQXcsYh/14.jpg", lab: "" },
    //     { shadeNo: "15", shadeName: "210", imgUrl: "https://i.ibb.co/jwsSCvL/15.jpg", lab: "" },
    //     { shadeNo: "16", shadeName: "220", imgUrl: "https://i.ibb.co/xKZqB3n/16.jpg", lab: "" },
    //     { shadeNo: "17", shadeName: "230", imgUrl: "https://i.ibb.co/F8ZZz38/17.jpg", lab: "" },
    //     { shadeNo: "18", shadeName: "235", imgUrl: "https://i.ibb.co/SB2dRJx/18.jpg", lab: "" },
    //     { shadeNo: "19", shadeName: "240", imgUrl: "https://i.ibb.co/cv6rC9W/19.jpg", lab: "" },
    //     { shadeNo: "20", shadeName: "250", imgUrl: "https://i.ibb.co/BrMfp5Y/20.jpg", lab: "" },
    //     { shadeNo: "21", shadeName: "255", imgUrl: "https://i.ibb.co/3BKnDKQ/21.jpg", lab: "" },
    //     { shadeNo: "22", shadeName: "260", imgUrl: "https://i.ibb.co/6b6RwRN/22.jpg", lab: "" },
    //     { shadeNo: "23", shadeName: "270", imgUrl: "https://i.ibb.co/9WRRpwB/23.jpg", lab: "" },
    //     { shadeNo: "24", shadeName: "280", imgUrl: "https://i.ibb.co/qCNpVxX/24.jpg", lab: "" },
    //     { shadeNo: "25", shadeName: "290", imgUrl: "https://i.ibb.co/ySr012Z/25.jpg", lab: "" },
    //     { shadeNo: "26", shadeName: "300", imgUrl: "https://i.ibb.co/Sr6M3VH/26.jpg", lab: "" },
    //     { shadeNo: "27", shadeName: "310", imgUrl: "https://i.ibb.co/98y9HHc/27.jpg", lab: "" },
    //     { shadeNo: "28", shadeName: "320", imgUrl: "https://i.ibb.co/ZNnJfsb/28.jpg", lab: "" },
    //     { shadeNo: "29", shadeName: "330", imgUrl: "https://i.ibb.co/2jhn7Fp/29.jpg", lab: "" },
    //     { shadeNo: "30", shadeName: "340", imgUrl: "https://i.ibb.co/GCGM0dS/30.jpg", lab: "" },
    //     { shadeNo: "31", shadeName: "345", imgUrl: "https://i.ibb.co/7kF71Ys/31.jpg", lab: "" },
    //     { shadeNo: "32", shadeName: "350", imgUrl: "https://i.ibb.co/NnPgxZv/32.jpg", lab: "" },
    //     { shadeNo: "33", shadeName: "360", imgUrl: "https://i.ibb.co/8D8Hb6d/33.jpg", lab: "" },
    //     { shadeNo: "34", shadeName: "370", imgUrl: "https://i.ibb.co/spSxfVK/34.jpg", lab: "" },
    //     { shadeNo: "35", shadeName: "380", imgUrl: "https://i.ibb.co/FxX2WYX/35.jpg", lab: "" },
    //     { shadeNo: "36", shadeName: "385", imgUrl: "https://i.ibb.co/s2gGStP/36.jpg", lab: "" },
    //     { shadeNo: "37", shadeName: "390", imgUrl: "https://i.ibb.co/gWZn2bY/37.jpg", lab: "" },
    //     { shadeNo: "38", shadeName: "400", imgUrl: "https://i.ibb.co/P9F9W69/38.jpg", lab: "" },
    //     { shadeNo: "39", shadeName: "410", imgUrl: "https://i.ibb.co/q5kwSVg/39.jpg", lab: "" },
    //     { shadeNo: "40", shadeName: "420", imgUrl: "https://i.ibb.co/6bnNKFK/40.jpg", lab: "" },
    //     { shadeNo: "41", shadeName: "430", imgUrl: "https://i.ibb.co/4fhtZMB/41.jpg", lab: "" },
    //     { shadeNo: "42", shadeName: "440", imgUrl: "https://i.ibb.co/Q8Cst8B/42.jpg", lab: "" },
    //     { shadeNo: "43", shadeName: "445", imgUrl: "https://i.ibb.co/TbFJF5r/43.jpg", lab: "" },
    //     { shadeNo: "44", shadeName: "450", imgUrl: "https://i.ibb.co/2NBb1Bs/44.jpg", lab: "" },
    //     { shadeNo: "45", shadeName: "460", imgUrl: "https://i.ibb.co/b5dj3R5/45.jpg", lab: "" },
    //     { shadeNo: "46", shadeName: "470", imgUrl: "https://i.ibb.co/yWtx3ks/46.jpg", lab: "" },
    //     { shadeNo: "47", shadeName: "480", imgUrl: "https://i.ibb.co/hK0z718/47.jpg", lab: "" },
    //     { shadeNo: "48", shadeName: "490", imgUrl: "https://i.ibb.co/z5W0jZ6/48.jpg", lab: "" },
    //     { shadeNo: "49", shadeName: "495", imgUrl: "https://i.ibb.co/XSFw1Hx/49.jpg", lab: "" },
    //     { shadeNo: "50", shadeName: "498", imgUrl: "https://i.ibb.co/j6rJPWP/50.jpg", lab: "" }

    // ];
    //const collection = client.db(dbName).collection(collectionName);
    console.log("we did it");
    const dbo = client.db(dbName);
    //insert 1
    // dbo.collection(collectionName).insertOne(docuIn, (err, result)=> {
    //     if (err) {
    //         console.log("cannot insert");
    //     } else{
    //         console.log("new document inserted!");
    //     }
    // });

    //insert many
    client
      .db(dbName)
      .collection(collectionName)
      .insertMany(docuIn, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Inserted " + result.insertedCount + "documents");
          client.close();
        }
      });

    // //find
    // client
    //   .db("skinDeep")
    //   .collection("userData")
    //   .findOne({}, (err, result) => {
    //     if (err) {
    //       throw err;
    //     } else {
    //         console.log("image retrieved");
    //         console.log(result.image);
    //       db.close();
    //     }
    //   });
    // client.close();
  }
});
