const { UserModel } = require("../../model");
const bcrypt = require("bcrypt");

class UserService {
  //signup
  static async signup(name, email, password) {
    try {
      const exist = await UserModel.findOne({ email });
      if (exist) {
        throw new Error("Email already in use");
      }
      const saltRounds = 10;
      const hash = await bcrypt.hash(password, saltRounds);
      const user = new UserModel({ name, email, password: hash });
      const savedUser = await user.save();
      return savedUser;
    } catch (error) {
      throw error;
    }
  }

  //login
  static async login({ email, password }) {
    try {
      const user = await UserModel.findOne({ email });

      if (!user) {
        throw new Error("User not found");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw Error("Invalid password");
      }
      // console.log("user from service:", user)
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;

// get user by userId
// const getUserByUserId = async ({ userId }) =>
//   UserModel.findById(userId);

// const getUserByEmail = async ({ email }) => UserModel.findOne({ email });

// module.exports = {
//   getUserByEmail,
//   createUser,
//   getUserByUserId,

// };
