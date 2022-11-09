import { AuthenticationError } from "apollo-server-express";

import { User } from "../../models";
import { signToken } from "../../utils/auth";
import { UniquenessError } from "../../utils/errors";

export const mutations = {
  addUser: async (_parent, { payload }) => {
    const { username, email, password } = payload;
    if (await User.findOne({ username })) {
      throw new UniquenessError("username");
    }
    if (await User.findOne({ email })) {
      throw new UniquenessError("email");
    }
    const user = await User.create({ username, email, password });
    const token = signToken(user);
    return { token, user };
  },

  // currently the client only sends email & password
  login: async (_parent, { payload }) => {
    const { username, email, password } = payload;
    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (!user) {
      throw new AuthenticationError("Wrong email or password");
    }
    const correctPw = await user.isCorrectPassword(password);
    if (!correctPw) {
      throw new AuthenticationError("Wrong email or password");
    }
    const token = signToken(user);
    return { token, user };
  },

  saveBook: async (_parent, { payload }, { userId }) => {
    if (!userId) {
      throw new AuthenticationError("Please login");
    }
    return await User.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { savedBooks: payload } },
      { new: true, runValidators: true }
    );
  },

  removeBook: async (_parent, { bookId }, { userId }) => {
    if (!userId) {
      throw new AuthenticationError("Please login");
    }
    return await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { savedBooks: { bookId } } },
      { new: true }
    );
  },
};
