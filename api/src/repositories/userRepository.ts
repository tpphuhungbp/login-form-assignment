import { User } from "../models/users.models";
import { IUser } from "../types";

class UserRepository {
  static async getUserByEmail(email: string) {
    return await User.findOne({ email });
  }
  static async createUserWithGoogle(email: string, username: string, googleAuth: string) {
    return await User.create({ email, username, googleAuth });
  }
  static async updateUserToken(id: number, token: string) {
    return await User.updateOne({ _id: id }, { token });
  }
}

export default UserRepository;
