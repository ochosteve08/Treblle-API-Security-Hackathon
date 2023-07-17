const UserService = require("../../services/user.services/user.services");
const { userValidation } = require("../../validations");

const {
  Transaction,
  jwt,
} = require("../../utils");

const registerUser = async (req, res) => {
   const transaction = await Transaction.startSession();
  try {
    await transaction.startTransaction();
    const { email, password } =
      await userValidation.userValidation.validateAsync(req.body);
     const user = await UserService.signup( email, password);
    // create a token
    const token = await jwt.createToken(user._id);
    res.status(200).json({ user, token }); 
    await transaction.commitTransaction();
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
    const { email, password } =
      await userValidation.userLoginValidation.validateAsync(req.body);
        // login a user
    const user = await UserService.login({ email, password });
    const { _id } = user;

    const token = await jwt.createToken(_id);

    res.status(200).json({ user, token });
    await transaction.commitTransaction();
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
