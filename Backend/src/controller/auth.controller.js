const userModel = require('../models/user.model')
const tokenblacklistModel = require('../models/blacklist.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const authCookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: false,
  maxAge: 24 * 60 * 60 * 1000
}

async function registerUserController(req,res) {
  try {
    const {username, email, password} = req.body

    if(!username || !email || !password){
      return res.status(400).json({
        message: "Please provide username, email, password"
      })
    }

    const isUserAlreadyExists = await userModel.findOne({
      $or:[{username},{email}]
    })

    if(isUserAlreadyExists) {
      return res.status(400).json({
        message: "This account username or email address is already exist"
      })
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hash
    })

    const token = jwt.sign(
      {id: user._id, username: user.username},
      process.env.JWT_SECRET,
      {expiresIn: "1d"}
    )

    res.cookie('token', token, authCookieOptions)

    res.status(201).json({
      message: "User registered successfully",
      user:{
        id: user._id,
        username: user.username,
        email: user.email
      }
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error"
    });
  }
}

async function loginUserController(req,res){
    const {email, password} = req.body

    if(!email || !password){
      return res.status(400).json({
        message: "Please provide email and password"
      })
    }

  const user = await userModel.findOne({email})

  if(!user){
    return res.status(400).json({
      message: "Invalid username or password"
    })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  
  if(!isPasswordValid){
    return res.status(400).json({
      message: "Invalid username or password 2"
    })
  }

  const token = jwt.sign(
    {id: user._id, username: user.username},
    process.env.JWT_SECRET,
    {expiresIn: '1d'}
  );

  res.cookie("token", token, authCookieOptions)

  res.status(200).json({
    message: "User loggedIn Successfully",
    user:{
      id: user._id,
      username: user.username,
      email: user.email
    }
  })
  
}


/**
 * @ name logoutController
 * @ description clear token fron user cookies and add token in  blacklist
 *  @access public 
 */
async function logoutUserController(req,res){
    const token = req.cookies?.token;

    if(token){
      await tokenblacklistModel.create({token})
    }

    res.clearCookie('token', authCookieOptions)

    res.status(200).json({
      message: "User logged out successfully"
    })
}
 
/**
 * @name getMeController
 * @description get the current user details
 * @access private
 */
async function getMeController(req,res){
  const user = await userModel.findById(req.user.id);

  res.status(200).json({
    message: "User details fetch successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    }
  })
}

module.exports = {registerUserController, 
  loginUserController, 
  logoutUserController,
  getMeController
}
