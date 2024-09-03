const authController = {};
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const {
  signUpValidation,
  loginValidation,
} = require("../validations/AuthValidation");
const AppError = require("../utils/error");

const key = process.env.SECRET_KEY;
const signToken = (id) => {
  // if (!key) {
  //   throw new AppError('SECRET_KEY is not defined in the environment variables.', 500);    }
  const token = jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: 2000,
  });
  return token;
};

signup = async (req, res, next) => {
  console.log("----------------------request");
  console.log(req.body.email);
  
  try {
    const { firstName, lastName, userName, email, phone, password } = req.body;
    console.log("firstName",firstName);
    
    if(!firstName || !lastName|| !userName ||  !email || !phone || !password){
      res.status(402).json({message:"enter all the fields"});
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      userName,
      email,
      phone,
      password: hashPassword,
     
    });

    const saveUser = await newUser.save();
    

    const token = signToken(saveUser.id);
    return res.send({
      token,
      saveUser
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(402).send({ message: "all fields are required" });
    }

    const user = await User.findOne({ email }).select("username email password fastName lastName phone");

    if (!user) {
      return next(new AppError("No account with this email has been registered", 404));
    }
    

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return next(new AppError("Incorrect password", 401));
    }

    const token = signToken(user.id);

    console.log(token);
    user.password = undefined;

    return res.send({
      token,

      user,
    });
  } catch (error) {
    console.log(error);
    res.send({ message: error });
  }
};



module.exports = { signup, login };
