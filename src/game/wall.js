
export default (game, dimensions) => {
  const wall = game.matter.add
  .sprite(20, dimensions.height, 'wall')
  .setPosition(dimensions.position.x, dimensions.position.y)
  .setStatic(true)
  .setOrigin(0.5, 0.5)
  .setDisplaySize(20, dimensions.height)
  wall.rotation = dimensions.rotation * Math.PI / 180
}
  