const { blizzard } = require('../../integrations')
const R = require('ramda')

const id = async ctx => {
  const guildInfo = await blizzard.guild.guildInfoLoader.load(ctx.Query)
  return R.path(['id'], guildInfo)
}

const name = async ctx => {
  const guildInfo = await blizzard.guild.guildInfoLoader.load(ctx.Query)
  return R.path(['name'], guildInfo)
}

const faction = async ctx => {
  const guildInfo = await blizzard.guild.guildInfoLoader.load(ctx.Query)
  return R.path(['faction', 'name'], guildInfo)
}

const member_count = async ctx => {
  const guildInfo = await blizzard.guild.guildInfoLoader.load(ctx.Query)
  return R.path(['member_count'], guildInfo)
}

const achievement_points = async ctx => {
  const guildInfo = await blizzard.guild.guildInfoLoader.load(ctx.Query)
  return R.path(['achievement_points'], guildInfo)
}

module.exports = {
  id,
  name,
  faction,
  member_count,
  achievement_points
}