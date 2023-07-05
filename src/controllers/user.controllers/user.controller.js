const UserService = require("../../services/user.services/user.services");
const {
  Transaction,
  jwt,
} = require("../../utils");

const registerUser = async (req, res) => {
   const transaction = await Transaction.startSession();
  try {
    await transaction.startTransaction();
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
    const token = await jwt.createToken(user._id);
    res.status(200).json({ user, token }); // Replace email and token with your actual response data
  } catch (error) {
    await transaction.abortTransaction();
    res.status(400).json({ error: error.message });
  } finally {
    await transaction.endSession();
  }
  
};

const userLogin = async (req, res) => {
  const transaction = await Transaction.startSession();
  try {
    await transaction.startTransaction();
    const { email, password } = req.body;
    if (!email || !password) {
      throw Error("all fields must be filled");
    }
    // login a user
    const user = await UserService.login({ email, password });
    const { _id } = user;

    const token = await jwt.createToken(_id);

    res.status(200).json({ user, token });
  } catch (error) {
     await transaction.abortTransaction();
    res.status(400).json({ error: error.message });
  } finally {
    await transaction.endSession();
  }
   
};

module.exports = {
  registerUser,
  userLogin,
};
