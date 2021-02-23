module.exports = `{
  getCharacterInfo(region: US, realm: azralon, character_name: "JohnDoe") {
    profile {
      name
      gender
      faction
      race
      character_class
      specialization
      guild
      level
      item_level
      achievement_points
      covenant
      covenant_renown
    }
    media {
      character_image_url
    }
    arena {
      bracket {
        type
        rating
        match_statistics {
          played
          won
          win_rate
        }
      }
    }
  }
}`