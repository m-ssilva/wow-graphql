const axios = require('axios')
const dayJS = require('dayjs')
const { BLIZZARD } = require('../../../config')
const { ApolloError } = require('apollo-server-express')

let lastTokenRequest // { token: 'ABC123', expiresIn: 86399 }

const generateToken = async () => {
  if (!lastTokenRequest || lastTokenRequest.expiresIn < dayJS()) {
    return axios({
      method: 'POST',
      url: BLIZZARD.AUTH_URL,
      params: {
        grant_type: 'client_credentials'
      },
      auth: {
        username: BLIZZARD.CLIENT_ID,
        password: BLIZZARD.CLIENT_SECRET
      }
    })
      .then(({ data }) => {
        lastTokenRequest = {
          token: data.access_token,
          expiresIn: dayJS().add(data.expires_in, 'seconds')
        }
        console.log(`Gerando um novo token`, lastTokenRequest.token)
        return lastTokenRequest.token
      })
      .catch(e => {
        console.log(`Erro ao solicitar token a API da Blizzard`, e)
        throw new ApolloError('AUTHENTICATION_ON_BLIZZARD_API_FAILED')
      })
  } else {
    console.log(`Reaproveitando o token armazenado em memória`, lastTokenRequest.token)
    return lastTokenRequest.token
  }
}

module.exports = { generateToken }