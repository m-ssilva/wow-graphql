const supertest = require('supertest')
const nock = require('nock')
const app = require('../../src')
const query = require('../query')
const expected = require('../expected')
const helpers = require('../helpers')

let request
let server

const test_parameters = {
  region: 'US',
  realm: 'Azralon',
  character_name: 'JohnDoe',
  namespace: 'profile-us',
  locale: 'en_us'
}

beforeEach(() => {
  server = app.listen()
  request = supertest(server)
  nock.disableNetConnect()
  nock.enableNetConnect('127.0.0.1')
})

afterEach(() => {
  server.close()
  nock.cleanAll()
  nock.enableNetConnect()
})

describe('Querying on /graphql - getCharacterInfo', () => {
  test('when a valid schema is provided and all services is available, should return the requests fields', async () => {
    helpers.mock.mockBlizzardAuthSuccess()
    helpers.mock.mockBlizzardProfileSuccess(test_parameters)
    helpers.mock.mockBlizzardMediaSuccess(test_parameters)
    helpers.mock.mockBlizzardArena2v2Success(test_parameters)
    helpers.mock.mockBlizzardArena3v3Success(test_parameters)
    await request
      .post('/graphql')
      .send({ query: query.getCharacterInfo })
      .expect(200, expected.getCharacterInfo)
  })

  test('when authentication api is unavailable, should return authentication error', async () => {
    helpers.mock.mockBlizzardAuthFail()
    await request
      .post('/graphql')
      .send({ query: query.getCharacterInfo })
      .expect(200, {})
  })
})