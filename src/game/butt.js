import Phaser from 'phaser';
let Bodies = Phaser.Physics.Matter.Matter.Bodies;

export default (game, { collisionGroup, x = 300, y = 300 }) => game.matter.add
  .image(0, 0, 'butt')
  .setExistingBody(Bodies.rectangle(0, 0, 30, 30, {
    label: 'dupa'
  }))
  .setCollisionGroup(collisionGroup)
  .setPosition(x, y);