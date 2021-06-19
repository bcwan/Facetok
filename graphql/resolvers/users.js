const User = require('../../models/User');

module.export = {
  Mutation: {
    register(_, args, context, info) {
      // Validate user data
      // Make sure user doesn't exist
      // Hash password and create user auth token
    }
  }
}