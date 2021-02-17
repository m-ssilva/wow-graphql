const axios = require('axios')
const { BLIZZARD } = require('../../../config')
const { generateToken } = require('./auth')
const DataLoader = require('dataloader')
const { ApolloError } = require('apollo-server')

const getArenaRating = async (region, realm, name, bracket) => {
  const token = await generateToken()
  const lowerCaseRegion = region.toLowerCase()
  const lowerCaseRealm = realm.toLowerCase().replace(/\_/g, '-') // replacing underscore to dash (https://github.com/graphql/graphql-js/issues/936)
  const lowerCaseName = name.toLowerCase()
  const response = await axios({
    method: 'GET',
    url: `${BLIZZARD.PROTOCOL}://${lowerCaseRegion}.${BLIZZARD.URL}/profile/wow/character/${lowerCaseRealm}/${lowerCaseName}/pvp-bracket/${bracket}`,
    params: {
      access_token: token,
      namespace: 'profile-us',
      locale: 'en-us'
    }
  })
    .then(({ data }) => {
      console.log(`Sucesso na integração com a API Blizzard - Arena ${bracket}`)
      return data
    })
    .catch(({ response }) => {
      console.log(`Erro na integração com a API Blizzard - Arena ${bracket}`)
      return response
    })
  if (response.status && response.status === 404 || response.status === 403) throw new ApolloError(`ARENA_RATING_${bracket}_NOT_FOUND`)
  return response
}

const arenaDuoBracketLoader = new DataLoader(async ([{ region, realm, character_name }]) => [getArenaRating(region, realm, character_name, '2v2')], { batch: false })

const arenaTrioBracketLoader = new DataLoader(async ([{ region, realm, character_name }]) => [getArenaRating(region, realm, character_name, '3v3')], { batch: false })


module.exports = {
  arenaDuoBracketLoader,
  arenaTrioBracketLoader
}