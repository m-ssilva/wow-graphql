const getGuildInfo = async (_, { region, realm, guild_name }, context, info) => ({
  Query: { region, realm, guild_name },
  Context: { ...context },
  Info: info
})

module.exports = { getGuildInfo }