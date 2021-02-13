const GMR = require('@wiicamp/graphql-merge-resolvers')
const character = require('./character')

const mainResolver = GMR.merge([
  character
])

module.exports = mainResolver