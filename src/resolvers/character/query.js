const { blizzard } = require('../../integrations')

const getCharacterInfo = async (_, { region, realm, character_name }, context, info) => ({
  Query: { region, realm, character_name },
  Context: { ...context },
  Info: info
})

module.exports = { getCharacterInfo }