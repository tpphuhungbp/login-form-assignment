import { User } from "../models/users.models";
import { IUser } from "../types";

class UserRepository {
  static async getUserByEmail(email: string): Promise<IUser | null> {
    try {
      const result = await User.findOne({ email });
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  static async createUserWithGoogle(
    email: string,
    username: string,
    googleAuth: string
  ): Promise<IUser> {
    try {
      const result = await User.create({ email, username, googleAuth });
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  static async createUser(email: string, username: string, password: string): Promise<IUser> {
    try {
      return await User.create({ email, username, password });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  static async updateUserToken(id: string, token: string) {
    try {
      return await User.updateOne({ _id: id }, { token });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

export default UserRepository;
