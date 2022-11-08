import { AuthenticationError } from "apollo-server-express";

import { User } from "../../models";

export const queries = {
  // search for logged-in user by id via context
  me: async (_parent, _args, { userId }) => {
    if (userId) {
      const user = User.findById(userId);
      if (user) {
        return user;
      }
    }
    throw new AuthenticationError("Please log in");
  },
};
