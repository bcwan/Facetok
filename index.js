const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { mongoURI } = require('./config.js');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
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