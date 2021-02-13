const character_image_url = body => {
  if (body.assets) {
    const characterImage = body.assets.find(asset => asset.key === 'main')
    if (characterImage) return characterImage.value
  }
}

module.exports = { character_image_url }