import jwt from "jsonwebtoken";

import { JWT_EXPIRATION, JWT_SECRET } from "./constants";

export const context = ({ req }) => {
  const auth = req.headers.authorization;
  if (auth) {
    const token = auth.split(" ").pop().trim();
    if (token) {
      const user = jwt.verify(token, JWT_SECRET, { maxAge: JWT_EXPIRATION });
      return { user };
    }
  }
};

export const signToken = user => {
  return jwt.sign(user, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
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
