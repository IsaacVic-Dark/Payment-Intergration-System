const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Post a Registration Credentials
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();

    const token = jwt.sign(
      { userId: user._id, userEmail: user.email, userName: user.name },
      process.env.JWT_SECRET,
      { 
        expiresIn: "1h" 
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, 
      maxAge: 3600000, 
      sameSite: "strict",
    });
    res.status(201).json({ msg: "User registered successfully" });    

  } catch (error) {
    console.error("Error in registration: ", error.message);
    res.status(500).send("Server error");
  }
};

// Post a Login Credentials
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { userId: user._id, userEmail: user.email, userName: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 360000,
      sameSite: "strict",
    });
    res.status(200).json({ msg: "Login success" });
  } catch (error) {
    console.error("Error in logIn: ", error.message);
    res.status(500).send("Server error");
  }
};

// Check Auth
const checkAuth = async (req, res) => {
  try {
    res.json({ success: true, message: "User is logged in", user: req.user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Logout
const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};

module.exports = { register, login, checkAuth, logout };
