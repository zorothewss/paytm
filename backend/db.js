const mongoose = require("mongoose")
dbURI = "mongodb+srv://zoro:zoro@123@paytm.um6ijy4.mongodb.net/paytm1"
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection successful"))
  .catch((err) => console.error("Database connection error: ", err));

const userSchema = mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    trim: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
});
//create the model for the schema
const User = mongoose.model('User', userSchema);
// export const User;
module.exports = {
    User
};