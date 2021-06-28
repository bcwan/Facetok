const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../../config');

const User = require('../../models/User');

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username
    },
    SECRET_KEY,
    { expiresIn: '1h' }
  );
}

module.export = {
  Mutation: {
    async register(_, { registerInput: { username, email, password, confirmPassword }}) {
              // Validate user data
              // Make sure user doesn't exist
              // Hash password and create user auth token 51:26
              password = await bcrypt.hash(password, 12);
              const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
              });

              const res = await newUser.save();

              const token = generateToken(res);
              
              return {
                ...res._doc,
                id: res._id,
                token
              };
      }
    }
};
