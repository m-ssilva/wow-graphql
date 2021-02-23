require('dotenv').config()
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { loadFiles } = require('graphql-import-files')
const resolvers = require('./resolvers')
const logging = require('./logging')
const { GraphQLError } = require('graphql')

const app = express()
const path = '/graphql'

const server = new ApolloServer({
  typeDefs: loadFiles('**/schemas/**/*.graphql'),
  resolvers,
  formatError: err => {
    console.log(`Returning error: ${err.message}`)
    return new GraphQLError(err.message)
  },
  plugins: [logging]
})

server.applyMiddleware({ app, path })

module.exports = app

