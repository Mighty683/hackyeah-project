import Phaser from 'phaser';
let Bodies = Phaser.Physics.Matter.Matter.Bodies;

export default (game, { collisionGroup }) => {
  
  const butt = game.matter.add
  .image(0, 0, 'butt')
  .setExistingBody(Bodies.rectangle(0, 0, 30, 30, {
    label: 'butt'
  }))
  .setCollisionGroup(collisionGroup)
  .setPosition(300, 300)
  butt.setDisplaySize(77/2,251/2)
  return butt
}