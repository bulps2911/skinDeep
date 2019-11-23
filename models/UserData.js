const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotEmptyString={type:String, minLength:1};
const userDataSchema = new Schema(
    {
      imgUrl: String,
      rgb: [Number]

    }
  );
  const UserData = mongoose.model("UserData", userDataSchema, "userData");

const productDataSchema = new Schema(
    {
        shadeNo: String,
        shadeName: String,
        imgUrl: String,
        lab : String
    }
);
const ProductData = mongoose.model("ProductData", productDataSchema, "productData");

module.exports = UserData;

