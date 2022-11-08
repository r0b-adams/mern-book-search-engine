import { AuthenticationError } from "apollo-server-express";

import { User } from "../../models";

export const queries = {
  // get all users
  users: async () => {
    return User.find();
  },

  // search for logged-in user by id via context
  me: async (_parent, _args, { userID }) => {
    if (userID) {
      const user = User.findById(userID);
      if (user) {
        return user;
      }
    }
    throw new AuthenticationError("Please log in");
  },
};
