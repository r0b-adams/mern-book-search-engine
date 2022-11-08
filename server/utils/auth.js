import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-express";

// create a jwt with user ID as payload
export const signToken = user => {
  return jwt.sign({ userID: user._id }, process.env.JWT_SECRET, {
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
        const { userID } = jwt.verify(token, process.env.JWT_SECRET, {
          maxAge: process.env.JWT_EXPIRATION,
        });
        req.userID = userID;

        // malformed token, invalid token, expired token
      } catch (error) {
        console.log(error.message);
        throw new AuthenticationError(error.message);
      }
    }
  }
  return req;
};

// // set token secret and expiration date
// const secret = 'mysecretsshhhhh';
// const expiration = '2h';

// module.exports = {
//   // function for our authenticated routes
//   authMiddleware: function (req, res, next) {
//     // allows token to be sent via  req.query or headers
//     let token = req.query.token || req.headers.authorization;

//     // ["Bearer", "<tokenvalue>"]
//     if (req.headers.authorization) {
//       token = token.split(' ').pop().trim();
//     }

//     if (!token) {
//       return res.status(400).json({ message: 'You have no token!' });
//     }

//     // verify token and get user data out of it
//     try {
//       const { data } = jwt.verify(token, secret, { maxAge: expiration });
//       req.user = data;
//     } catch {
//       console.log('Invalid token');
//       return res.status(400).json({ message: 'invalid token!' });
//     }

//     // send to next endpoint
//     next();
//   },
//   signToken: function ({ username, email, _id }) {
//     const payload = { username, email, _id };

//     return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
//   },
// };
