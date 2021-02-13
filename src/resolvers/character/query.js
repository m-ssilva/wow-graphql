const { blizzard } = require('../../integrations')
const DataLoader = require('dataloader')

const createLoaders = () => ({
  characterInfo: new DataLoader(([{ region, realm, character_name }]) => blizzard.character.getCharacterInfo(region, realm, character_name)),
  characterImage: new DataLoader(([{ region, realm, character_name }]) => blizzard.character.getCharacterImage(region, realm, character_name))
})

const loaders = createLoaders()

const getCharacterInfo = async (_, { region, realm, character_name }, context, info) => ({
  Query: { region, realm, character_name },
  Context: { ...context, loaders },
  Info: info
})

module.exports = { getCharacterInfo }