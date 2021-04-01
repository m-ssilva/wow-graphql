const { blizzard, raiderIO: raiderIOIntegration } = require('../../integrations')
const builders = require('../../builders')
const _ = require('lodash')

const profile = async ctx => {
  const characterProfileInfo = await blizzard.character.characterInfoLoader.load(ctx.Query)

  const getFaction = async () => {
    if (characterProfileInfo && characterProfileInfo.faction) return characterProfileInfo.faction.name
  }

  const getRace = async () => {
    if (characterProfileInfo && characterProfileInfo.race) return characterProfileInfo.race.name
  }

  const getCharacterClass = async () => {
    if (characterProfileInfo && characterProfileInfo.character_class) return characterProfileInfo.character_class.name
  }

  const getSpecialization = async () => {
    if (characterProfileInfo) return characterProfileInfo.active_spec.name
  }

  const getGuild = async () => {
    if (characterProfileInfo.guild && characterProfileInfo.guild.name) return characterProfileInfo.guild.name
  }

  const getLevel = async () => characterProfileInfo.level

  const getItemLevel = async () => characterProfileInfo.equipped_item_level

  const getAchievementPoints = async () => characterProfileInfo.achievement_points

  const getCovenant = async () => {
    if (characterProfileInfo && characterProfileInfo.covenant_progress && characterProfileInfo.covenant_progress.chosen_covenant)
      return characterProfileInfo.covenant_progress.chosen_covenant.name
  }

  const getCovenantRenown = async () => {
    if (characterProfileInfo && characterProfileInfo.covenant_progress) return characterProfileInfo.covenant_progress.renown_level
  }

  return {
    name: _.get(characterProfileInfo, 'name'),
    gender: _.get(characterProfileInfo, 'gender.name'),
    faction: getFaction(),
    race: getRace(),
    character_class: getCharacterClass(),
    specialization: getSpecialization(),
    guild: getGuild(),
    level: getLevel(),
    item_level: getItemLevel(),
    achievement_points: getAchievementPoints(),
    covenant: getCovenant(),
    covenant_renown: getCovenantRenown()
  }
}

const media = async ctx => {
  const characterMedia = await blizzard.character.characterImageLoader.load(ctx.Query)

  const getCharacterImageURL = async () => {
    if (characterMedia.assets) {
      const characterMainImage = characterMedia.assets.find(asset => asset.key === 'main')
      if (characterMainImage)
        return characterMainImage.value
    }
  }

  return {
    character_image_url: getCharacterImageURL()
  }
}

const arena = async ctx => {
  const [duoBracket, trioBracket] = await Promise.allSettled([
    blizzard.arena.arenaDuoBracketLoader.load(ctx.Query),
    blizzard.arena.arenaTrioBracketLoader.load(ctx.Query)
  ])

  const getBracket = async () => {
    return [
      builders.bracket.arenaBracket(duoBracket.value, 'Arena 2v2'),
      builders.bracket.arenaBracket(trioBracket.value, 'Arena 3v3')
    ].filter(bracket => bracket)
  }

  return {
    bracket: getBracket()
  }
}

const raiderIO = async ctx => {
  const raiderIOProfile = await raiderIOIntegration.profile.profileLoader.load(ctx.Query)

  const getMythicScore = () => raiderIOProfile.mythic_plus_scores_by_season[0].scores.all

  const getBestRuns = () => {
    if (raiderIOProfile)
      return raiderIOProfile.mythic_plus_best_runs.map(run => ({
        dungeon: run.dungeon,
        short_name: run.short_name,
        mythic_level: run.mythic_level,
        completed_within_time: !!run.num_keystone_upgrades,
        score: run.score,
        url: run.url
      }))
  }

  return {
    highest_season_score: getMythicScore(),
    best_runs: getBestRuns()
  }
}

module.exports = {
  profile,
  media,
  arena,
  raiderIO
}