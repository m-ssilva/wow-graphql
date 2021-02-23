const nock = require('nock')
const mock = require('../mock')
const { BLIZZARD } = require('../../config')

const mockBlizzardAuthSuccess = () => {
  nock('https://us.battle.net')
    .persist()
    .post('/oauth/token')
    .query({ grant_type: 'client_credentials' })
    .reply(200, mock.blizzardAuth)
}

const mockBlizzardProfileSuccess = ({ region, realm, character_name, namespace, locale }) => {
  const lowerCaseRegion = region.toLowerCase()
  const lowerCaseRealm = realm.toLowerCase()
  const lowerCaseName = character_name.toLowerCase()

  nock(`${BLIZZARD.PROTOCOL}://${lowerCaseRegion}.${BLIZZARD.URL}`)
    .get(`/profile/wow/character/${lowerCaseRealm}/${lowerCaseName}`)
    .query({ namespace, locale, access_token: 'randomfaketoken' })
    .reply(200, mock.blizzardProfile)
}

const mockBlizzardMediaSuccess = ({ region, realm, character_name, namespace, locale }) => {
  const lowerCaseRegion = region.toLowerCase()
  const lowerCaseRealm = realm.toLowerCase()
  const lowerCaseName = character_name.toLowerCase()

  nock(`${BLIZZARD.PROTOCOL}://${lowerCaseRegion}.${BLIZZARD.URL}`)
    .get(`/profile/wow/character/${lowerCaseRealm}/${lowerCaseName}/character-media`)
    .query({ namespace, locale, access_token: 'randomfaketoken' })
    .reply(200, mock.blizzardMedia)
}

const mockBlizzardArena2v2Success = ({ region, realm, character_name, namespace, locale }) => {
  const lowerCaseRegion = region.toLowerCase()
  const lowerCaseRealm = realm.toLowerCase()
  const lowerCaseName = character_name.toLowerCase()

  nock(`${BLIZZARD.PROTOCOL}://${lowerCaseRegion}.${BLIZZARD.URL}`)
    .get(`/profile/wow/character/${lowerCaseRealm}/${lowerCaseName}/pvp-bracket/2v2`)
    .query({ access_token: 'randomfaketoken', namespace, locale })
    .reply(200, mock.blizzardArena2v2)
}

const mockBlizzardArena3v3Success = ({ region, realm, character_name, namespace, locale }) => {
  const lowerCaseRegion = region.toLowerCase()
  const lowerCaseRealm = realm.toLowerCase()
  const lowerCaseName = character_name.toLowerCase()

  nock(`${BLIZZARD.PROTOCOL}://${lowerCaseRegion}.${BLIZZARD.URL}`)
    .get(`/profile/wow/character/${lowerCaseRealm}/${lowerCaseName}/pvp-bracket/3v3`)
    .query({ access_token: 'randomfaketoken', namespace, locale })
    .reply(200, mock.blizzardArena3v3)
}

const mockBlizzardAuthFail = () => {
  nock('https://us.battle.net')
    .persist()
    .post('/oauth/token')
    .query({ grant_type: 'client_credentials' })
    .reply(500, { error: 'ERROR_GETTING_TOKEN' })
}

module.exports = {
  mockBlizzardAuthSuccess,
  mockBlizzardProfileSuccess,
  mockBlizzardMediaSuccess,
  mockBlizzardArena2v2Success,
  mockBlizzardArena3v3Success,
  mockBlizzardAuthFail
}