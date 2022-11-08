import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-express";

// create a jwt with user ID as payload
export const signToken = user => {
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};

// req instance of Express Incoming Message
export const context = ({ req }) => {
  // grab the auth header
  const auth = req.headers.authorization;

  // make sure it exists
  if (auth) {
    // ["Bearer", "<token>"]
    const token = auth.split(" ").pop().trim();

    // if the token exists, validate and decode data
    // then attach to req object
    if (token) {
      try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET, {
          maxAge: process.env.JWT_EXPIRATION,
        });
        req.userId = userId;

        // malformed token, invalid token, expired token
      } catch (error) {
        console.log(error.message);
        throw new AuthenticationError(error.message);
      }
    }
  }
  return req;
};
