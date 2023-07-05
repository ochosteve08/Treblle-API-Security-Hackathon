const UserService = require("../../services/user.services/user.services");
const validator = require("validator");
const { createToken } = require("../../utils/jwtTokens");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //validator
    if (!name || !email || !password) {
      throw Error("all fields must be filled");
    }

    if (!validator.isEmail(email)) {
      throw Error("Please enter a valid email");
    }
    if (!validator.isStrongPassword(password)) {
      throw Error("password not strong enough");
    }

    const user = await UserService.signup(name, email, password);
    // create a token
    const token = await createToken(user._id);
    res.status(200).json({ user, token }); // Replace email and token with your actual response data
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw Error("all fields must be filled");
    }
    // login a user
    const user = await UserService.login({ email, password });
    const { _id } = user;

    const token = await createToken(_id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  userLogin,
};
