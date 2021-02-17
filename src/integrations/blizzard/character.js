const axios = require('axios')
const { BLIZZARD } = require('../../../config')
const { generateToken } = require('./auth')
const DataLoader = require('dataloader')
const { ApolloError } = require('apollo-server')

const getCharacterInfo = async (region, realm, name) => {
  const token = await generateToken()
  const lowerCaseRegion = region.toLowerCase()
  const lowerCaseRealm = realm.toLowerCase().replace(/\_/g, '-') // replacing underscore to dash (https://github.com/graphql/graphql-js/issues/936)
  const lowerCaseName = name.toLowerCase()
  const response = await axios({
    method: 'GET',
    url: `${BLIZZARD.PROTOCOL}://${lowerCaseRegion}.${BLIZZARD.URL}/profile/wow/character/${lowerCaseRealm}/${lowerCaseName}`,
    params: {
      access_token: token,
      namespace: 'profile-us',
      locale: 'en_us'
    }
  })
    .then(({ data }) => {
      console.log('Sucesso na integração com a API Blizzard - Character Profile')
      return data
    })
    .catch(({ response }) => {
      console.log('Erro na integração com a API Blizzard - Character Profile')
      return response
    })
  if (response.status && response.status === 404 || response.status === 403) throw new ApolloError('CHARACTER_NOT_FOUND', 1, { params: { region, realm, name } })
  return response
}

const getCharacterImage = async (region, realm, name) => {
  const token = await generateToken()
  const lowerCaseRegion = region.toLowerCase()
  const lowerCaseRealm = realm.toLowerCase().replace(/\_/g, '-') // replacing underscore to dash (https://github.com/graphql/graphql-js/issues/936)
  const lowerCaseName = name.toLowerCase()
  const response = await axios({
    method: 'GET',
    url: `${BLIZZARD.PROTOCOL}://${lowerCaseRegion}.${BLIZZARD.URL}/profile/wow/character/${lowerCaseRealm}/${lowerCaseName}/character-media`,
    params: {
      access_token: token,
      namespace: 'profile-us',
      locale: 'en_us'
    }
  })
    .then(({ data }) => {
      console.log('Sucesso na integração com a API Blizzard - Character Media')
      return data
    })
    .catch(({ response }) => {
      console.log('Erro na integração com a API Blizzard - Character Media')
      return response
    })
  if (response.status && response.status === 404 || response.status === 403) throw new ApolloError('CHARACTER_MEDIA_NOT_FOUND', 2, { params: { region, realm, name } })
  return response
}

const characterInfoLoader = new DataLoader(async ([{ region, realm, character_name }]) => [getCharacterInfo(region, realm, character_name)], { batch: false })

const characterImageLoader = new DataLoader(async ([{ region, realm, character_name }]) => [getCharacterImage(region, realm, character_name)], { batch: false })

module.exports = {
  getCharacterInfo,
  getCharacterImage,
  characterInfoLoader,
  characterImageLoader
}