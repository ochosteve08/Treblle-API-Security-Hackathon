const { UserModel } = require("../../models");
const bcrypt = require("bcrypt");

class UserService {
  //signup
  static async signup( email, password) {
    try {
      const exist = await UserModel.findOne({ email });
      if (exist) {
        throw new Error("Email already in use");
      }
      const saltRounds = 10;
      const hash = await bcrypt.hash(password, saltRounds);
      const user = new UserModel({ email, password: hash });
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
     
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;
