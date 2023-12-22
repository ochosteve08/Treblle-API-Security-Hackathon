const { UserModel } = require("../../models");
const bcrypt = require("bcrypt");
const { success, error } = require("../../lib-handler");

class UserService {
  static async signup(email, password) {
    try {
      const exist = await UserModel.findOne({ email });
      if (exist) {
        throw error.throwConflict({ message: "Email already in use" });
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
        throw error.throwNotFound({ message: "User not found" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw error.throwForbiddenError({message: "Invalid password"});
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;
