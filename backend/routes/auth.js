const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
// npm packakge for hashing password , adding salt and paper in password
const bcrypt = require('bcryptjs');
// jsonwebtoken provides a safe connection between client and db
var jwt = require('jsonwebtoken');
// Creating a random string to sign jwt token
const JWT_SECRET = 'Signed$by$SMANotebook'

const fetchuser = require('../middleware/fetchuser');


//ROUTE 1: Create a User using: POST "/api/auth/createuser". No login Requires
router.post('/createuser',[
  body('email', "Enter a valid Email").isEmail(),
  body('name', "Length of Name should be greater than 3").isLength({ min: 3 }),
  body('password', "Length of password should be greater than 3").isLength({ min: 3 })],
  async (req, res) => {
    let success = false;
    // if there are errors, return bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    // console.log(req.body);
    // producing salt (an extra random string to enhance security from rainbow table )
    const salt = await bcrypt.genSalt();
    // Hashing the row password with salt 
    const secPass = await bcrypt.hash(req.body.password, salt);
    // Check whether the user with same email exist already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({success, error: "Sorry! a user with this email already exist" })
      }
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      })
      const data = {
        user: {
          id: user.id
        }
      }
      // creating token to verify
      const authToken = jwt.sign(data, JWT_SECRET)
      // console.log(authToken)
      success= true;
      res.json({success, authToken })
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  })


//ROUTE 2: Authenticate a user using : POST "/api/auth/login", No login required
router.post('/login', [
  body('email', "Enter a valid Email").isEmail(),
  body('password', "Password can not be blank").exists(),
], async (req, res) => {
  let success = false;
  // if there are errors, return bad request and error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({success, error: "Please try to login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ success,error: "Please try to login with correct credentials" });
    }
    // data of user
    const data = {
      user: {
        id: user.id
      }
    }
    // creating token to verify
    const authToken = jwt.sign(data, JWT_SECRET)
    success = true;
    res.json({success, authToken })
  } catch (error) {
    console.log(error.message);
    res.status(500).send(success+"Internal Server Error");
  }
})



//ROUTE 3: Get logedin user detail using : POST "/api/auth/login", login required
router.post('/getuser',fetchuser ,async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some Error occured");
  }
})
module.exports = router