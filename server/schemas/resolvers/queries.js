import { AuthenticationError } from "apollo-server-express";
import { User } from "../../models";

export const queries = {
  users: async () => User.find(),
  user: async (_parent, _args, context) => {
    if (context.user) {
      return User.findById(context.user._id);
    }
    throw new AuthenticationError("Please log in");
  },
};
