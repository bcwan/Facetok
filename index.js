// 29:10 https://www.youtube.com/watch?v=n1mdAPFq2Os&ab_channel=freeCodeCamp.org
const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const { MONGODB } = require('./config.js');

const typeDefs = gql`
  type Query {
    sayHi: String!
  }
`;

// needed for any subscription or mutation in GraphQL
const resolvers = {
  Query: {
    sayHi: () => 'Hello World!'
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
});

// connect to database
mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected')
    return server.listen({ port: 5000 });
  })
  .then(res => {
    console.log(`Server running at ${res.url}`)
  });