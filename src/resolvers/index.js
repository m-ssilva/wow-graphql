const GMR = require('@wiicamp/graphql-merge-resolvers')
const character = require('./character')
const guild = require('./guild')

const mainResolver = GMR.merge([
  character,
  guild
])

module.exports = mainResolver