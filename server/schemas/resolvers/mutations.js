import { AuthenticationError } from "apollo-server-express";

import { User } from "../../models";
import { signToken } from "../../utils/auth";
import { UniquenessError } from "../../utils/errors";

export const mutations = {
  signup: async (_parent, { username, email, password }) => {
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

  login: async (_parent, { username, email, password }) => {
    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (!user) {
      throw new AuthenticationError("Wrong username, email, or password");
    }
    const correctPw = await user.isCorrectPassword(password);
    if (!correctPw) {
      throw new AuthenticationError("Wrong username, email, or password");
    }
    const token = signToken(user);
    return { token, user };
  },

  // TODO: implement save/delete book functionality
  // saveBook: async (parent, args, context) => {},
  // deleteBook: async (parent, args, context) => {},
};
