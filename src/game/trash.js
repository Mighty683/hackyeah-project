import Phaser from 'phaser';
let Bodies = Phaser.Physics.Matter.Matter.Bodies;

export default (game) => game.matter.add
  .image(0, 0, 'trash')
  .setExistingBody(Bodies.rectangle(0, 0, 40, 80, {
    label: 'trash'
  }))
  .setPosition(740, 540)
  .setStatic(true);