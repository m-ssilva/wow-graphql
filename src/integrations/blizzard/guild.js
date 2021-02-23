const axios = require('axios')
const { BLIZZARD } = require('../../../config')
const { generateToken } = require('./auth')
const DataLoader = require('dataloader')
const { ApolloError } = require('apollo-server-express')

const getToken = async () => generateToken()

const getGuildInfo = async (region, realm, guild_name) => {
  const lowerCaseRegion = region.toLowerCase()
  const lowerCaseRealm = realm.toLowerCase().replace(/\_/g, '-') // replacing underscore to dash (https://github.com/graphql/graphql-js/issues/936)
  const lowerCaseGuildName = guild_name.toLowerCase().replace(/\s/g, '-')
  const response = await axios({
    method: 'GET',
    url: `${BLIZZARD.PROTOCOL}://${lowerCaseRegion}.${BLIZZARD.URL}/data/wow/guild/${lowerCaseRealm}/${lowerCaseGuildName}`,
    params: {
      access_token: await getToken(),
      namespace: 'profile-us',
      locale: 'en_us'
    }
  })
    .then(({ data }) => {
      console.log('Sucesso na integração com a API Blizzard - Guild')
      return data
    })
    .catch(({ response }) => {
      console.log('Erro na integração com a API Blizzard - Guild')
      return response
    })
  if (response.status && response.status === 404 || response.status === 403) throw new ApolloError('GUILD_NOT_FOUND')
  return response
}

const guildInfoLoader = new DataLoader(async ([{ region, realm, guild_name }]) => [getGuildInfo(region, realm, guild_name)], { batch: false })

module.exports = {
  guildInfoLoader
}