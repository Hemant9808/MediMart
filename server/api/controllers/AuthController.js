const authController = {};
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const {
  signUpValidation,
  loginValidation,
} = require("../validations/AuthValidation");
const nodemailer = require("nodemailer");
const AppError = require("../utils/error");
const { payment, welcome } = require("../utils/constant");

const key = process.env.SECRET_KEY;
const signToken = (id) => {
  // if (!key) {
  //   throw new AppError('SECRET_KEY is not defined in the environment variables.', 500);    }
  const token = jwt.sign({ id }, process.env.SECRET_KEY, {
   // expiresIn: 2000,
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

login = async (req, res,next) => {
  try {
    const { email, password } = req.body;
    console.log( email, password);

    if (!email || !password) {
      res.status(402).send({ message: "all fields are required"});
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

  forgotPassword = async (req, res) => {
  try {
    //console.log( "useridfromfrogotpasswrd" ,req.body.user?._id);

    console.log("enterd");

    // const { email } = req.body;

    // const foundUser = await Client.findOne({ email });
    // console.log("userFound", foundUser);

    // if (!foundUser) {
    //   console.log("usernot fournd");
    //   return res.status(400).json({ message: "User does not exist" });
    // }

    // const resetToken = crypto.randomBytes(20).toString("hex");
    // foundUser.resetPasswordToken = resetToken;
    // foundUser.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour from now

    // const newUser = await foundUser.save();
    // console.log(newUser);

    // Set up nodemailer transporter (update with your email service details)
    const transporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: "hemant@adirayglobal.com",
        pass: "ogmnatcklinhjoyl",
      },
    });
    
    const mailOptions = {
      from: "hemant@adirayglobal.com",
      to: "hemant27134@gmail.com ",
      cc: ["lalit@threely.io"],

      subject: "Password Reset",
      // text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
      //   Please click on the following link, or paste this into your browser to complete the process:\n\n
      //   http://${req.headers.host}/reset/${resetToken}\n\n
      //   If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      html: welcome,
    };
    //   http://${req.headers.host}/reset/${resetToken}\n\n

    transporter.sendMail(mailOptions, (error, response) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Error sending email", error });
      }
      console.log("Email sent:", response);
      res.status(200).json({ message: "Recovery email sent" });
    });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = { signup, login,forgotPassword };
