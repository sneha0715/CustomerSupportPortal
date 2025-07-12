import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema({

   fullname: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
      unique: true

   },
   password: {
      type: String,
      required: true,
      select: false
   },
   role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
   }
},
   {
      timestamps: true
   }
);


userSchema.statics.hashPassword = function (password) {
   return bcrypt.hash(password, 10)
}
userSchema.methods.comparePassword = function (password) {
   return bcrypt.compare(password, this.password);
}

userSchema.methods.generateToken = function () {
   const token = jwt.sign(
      { _id: this._id, role: this._role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
   )
   return token;
}

const User = mongoose.model("User", userSchema)
export default User