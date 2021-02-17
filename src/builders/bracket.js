const _ = require('lodash')

const arenaBracket = info => {
  const bracket = _.get(info, 'bracket.type')
  if (bracket) return {
    type: bracket,
    rating: _.get(info, 'rating'),
    match_statistics: {
      played: _.get(info, 'season_match_statistics.played'),
      won: _.get(info, 'season_match_statistics.won'),
      lost: _.get(info, 'season_match_statistics.lost'),
      win_rate: `${((_.get(info, 'season_match_statistics.won') / _.get(info, 'season_match_statistics.played')) * 100).toFixed(2)}%`
    }
  }
}

module.exports = {
  arenaBracket
}