module.exports = {
  BLIZZARD: {
    CLIENT_ID: process.env.BLIZZ_CLIENT_ID,
    CLIENT_SECRET: process.env.BLIZZ_CLIENT_SECRET,
    PROTOCOL: 'https',
    URL: 'api.blizzard.com',
    AUTH_URL: 'https://us.battle.net/oauth/token'
  },
  RAIDER_IO: {
    URL: 'https://raider.io/api/v1'
  }
}