//101255891
const express = require('express')
const mongoose = require('mongoose')
const TypeDefs = require('./schema')
const Resolvers = require('./resolvers')
const bodyParser = require('body-parser')
const cors = require('cors')
const { ApolloServer } = require('apollo-server-express')

const dotenv = require('dotenv')
dotenv.config()


const url = process.env.MONGODB_URL

const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

connect.then(
  (db) => {
    console.log('     Connected. ')
  },
  (err) => {
    console.log(err)
  }
)


const server = new ApolloServer({
  typeDefs: TypeDefs.typeDefs,
  resolvers: Resolvers.resolvers,
})


const app = express()
app.use(bodyParser.json())
app.use('*', cors())
async function startServer() {
  apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
}
app.listen({ port: process.env.PORT }, () =>
  console.log(
    `Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
  )
)