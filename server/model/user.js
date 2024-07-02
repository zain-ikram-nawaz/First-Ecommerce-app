const mongoose = require("mongoose");
// const secret_key = "zainbhaifdsf@dfsd454534535";
// const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userData = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cartData:{
    type: Array,
    default:[]
  }
  
});
// password bycryt
userData.pre("save", async function (next) {
  const hashedPass = await bcrypt.hash(this.password, 12);
  this.password = hashedPass;
  next();
});
// we are generate jwt token in db
// userData.methods.generateAuthToken = async function () {
//   try {
//     const token = jwt.sign(
//       { _id: this._id, email:this.email, firstName: this.firstName },
//       secret_key,{
//         expiresIn: "1d"
//       }
//     );
//     this.tokens = this.tokens.concat({ token: token });
//     await this.save();
//     return token;
//   } catch (err) {
//     console.log(err);
//   }
// };
const user = mongoose.model("users", userData);
module.exports = user;
