const axios = require('axios')
const { RAIDER_IO } = require('../../../config')
const DataLoader = require('dataloader')
const { ApolloError } = require('apollo-server-express')

const getProfile = async (region, realm, character_name) => {
  const lowerCaseRegion = region.toLowerCase()
  const lowerCaseRealm = realm.toLowerCase().replace(/\_/g, '-') // replacing underscore to dash (https://github.com/graphql/graphql-js/issues/936)
  const lowerCaseName = character_name.toLowerCase()

  const response = await axios({
    method: 'GET',
    url: `${RAIDER_IO.URL}/characters/profile`,
    params: {
      region: lowerCaseRegion,
      realm: lowerCaseRealm,
      name: lowerCaseName,
      fields: 'mythic_plus_scores_by_season:current,mythic_plus_best_runs'
    }
  })
    .then(({ data }) => {
      console.log('Sucesso na integração com a API Raider.IO - Profile')
      return data
    })
    .catch(({ response }) => {
      console.log('Erro na integração com a API Raider.IO - Profile')
      return response
    })
  if (response.status && response.status === 400) throw new ApolloError('RAIDER_IO_PROFILE_NOT_FOUND')
  return response
}

const profileLoader = new DataLoader(async ([{ region, realm, character_name }]) => [getProfile(region, realm, character_name)])

module.exports = {
  profileLoader
}