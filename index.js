const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const { typeDefs } = require('./graphql/typeDefs'); 
const Post = require('./models/Post');
const { mongoURI } = require('./config.js');


// needed for any subscription or mutation in GraphQL: responsible for executing methods inside
const resolvers = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch(err) {
        throw new Error(err);
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
});

// connect to database
mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected')
    return server.listen({ port: 5000 });
  })
  .then(res => {
    console.log(`Server running at ${res.url}`)
  })
  .catch(err => {
    console.error(err)
  });