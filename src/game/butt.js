import Phaser from 'phaser';
let Bodies = Phaser.Physics.Matter.Matter.Bodies;

export default (game, { collisionGroup, x = 300, y = 300 }) => {
  
  const butt = game.matter.add
  .image(0, 0, 'butt')
  .setExistingBody(Bodies.rectangle(0, 0, 20, 60, {
    label: 'butt'
  }))
  .setCollisionGroup(collisionGroup)
  .setPosition(x, y);
  if (game.buts) {
    game.butts.push(butt)
  } else {
    game.butts = [butt]
  }
  return butt
}
