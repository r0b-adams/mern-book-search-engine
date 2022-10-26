import { AuthenticationError } from "apollo-server-express";

import { User } from "../../models";

export const queries = {
  // get all users
  users: async () => {
    return User.find();
  },

  // get a single user by id via context
  user: async (_parent, _args, context) => {
    if (context.user) {
      return User.findById(context.user._id);
    }
    throw new AuthenticationError("Please log in");
  },
};
