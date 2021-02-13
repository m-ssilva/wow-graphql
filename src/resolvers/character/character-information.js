const character = require(".")

const name = async ctx => {
  const characterInfo = await ctx.Context.loaders.characterInfo.load(ctx.Query)
  return characterInfo.name
}

const gender = async ctx => {
  const characterInfo = await ctx.Context.loaders.characterInfo.load(ctx.Query)
  return characterInfo.gender.name
}

const media = async ctx => {
  const characterMedia = await ctx.Context.loaders.characterImage.load(ctx.Query)
  if (characterMedia.assets) {
    const characterMainImage = characterMedia.assets.find(asset => asset.key === 'main')
    if (characterMainImage)
      return { character_image_url: characterMainImage.value }
  }
}

const faction = async ctx => {
  const characterInfo = await ctx.Context.loaders.characterInfo.load(ctx.Query)
  return characterInfo.faction.name
}

const race = async ctx => {
  const characterInfo = await ctx.Context.loaders.characterInfo.load(ctx.Query)
  return characterInfo.race.name
}

const character_class = async ctx => {
  const characterInfo = await ctx.Context.loaders.characterInfo.load(ctx.Query)
  return characterInfo.character_class.name
}

const specialization = async ctx => {
  const characterInfo = await ctx.Context.loaders.characterInfo.load(ctx.Query)
  return characterInfo.active_spec.name
}

const guild = async ctx => {
  const characterInfo = await ctx.Context.loaders.characterInfo.load(ctx.Query)
  if (characterInfo.guild && characterInfo.guild.name) return characterInfo.guild.name
}

const level = async ctx => {
  const characterInfo = await ctx.Context.loaders.characterInfo.load(ctx.Query)
  return characterInfo.level
}

const item_level = async ctx => {
  const characterInfo = await ctx.Context.loaders.characterInfo.load(ctx.Query)
  return characterInfo.equipped_item_level
}

const achievement_points = async ctx => {
  const characterInfo = await ctx.Context.loaders.characterInfo.load(ctx.Query)
  return characterInfo.achievement_points
}

const covenant = async ctx => {
  const characterInfo = await ctx.Context.loaders.characterInfo.load(ctx.Query)
  if (characterInfo.covenant_progress && characterInfo.covenant_progress.chosen_covenant)
    return characterInfo.covenant_progress.chosen_covenant.name
}

const covenant_renown = async ctx => {
  const characterInfo = await ctx.Context.loaders.characterInfo.load(ctx.Query)
  if (characterInfo.covenant_progress) return characterInfo.covenant_progress.renown_level
}

module.exports = {
  name,
  gender,
  faction,
  race,
  character_class,
  specialization,
  guild,
  level,
  item_level,
  achievement_points,
  covenant,
  covenant_renown,
  media
}