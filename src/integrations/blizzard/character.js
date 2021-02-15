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
      console.log('Sucesso na integração com a API Blizzard')
      return data
    })
    .catch(({ response }) => {
      console.log('Erro na integração com a API Blizzard')
      return response
    })
  if (response.status && response.status === 404 || response.status === 403) throw new Error('CHARACTER_NOT_FOUND')
  return [response]
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
      console.log('Sucesso na integração com a API Blizzard')
      return data
    })
    .catch(({ response }) => {
      console.log('Erro na integração com a API Blizzard')
      return response
    })
  if (response.status && response.status === 404 || response.status === 403) throw new ApolloError('CHARACTER_MEDIA_NOT_FOUND', 2, { params: { region, realm, name } })
  return [response]
}

const characterInfoLoader = new DataLoader(([{ region, realm, character_name }]) => getCharacterInfo(region, realm, character_name))

const characterImageLoader = new DataLoader(([{ region, realm, character_name }]) => getCharacterImage(region, realm, character_name))


module.exports = {
  getCharacterInfo,
  getCharacterImage,
  characterInfoLoader,
  characterImageLoader
}