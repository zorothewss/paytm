const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Database connection successful"))
  .catch((err) => console.error("Database connection error: ", err));

const userSchema = mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
});

const accountSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

//create the model for the schema
const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);
// export const User;
module.exports = {
  User,
  Account,
};
