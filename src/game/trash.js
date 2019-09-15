import Phaser from 'phaser';
let Bodies = Phaser.Physics.Matter.Matter.Bodies;

export default (game) => {
  let trashSensor = Bodies.rectangle(0, 0, 40, 70, { isSensor: true, label: 'trash' })
  let trashBody = Bodies.rectangle(0, 0, 60, 60)
  let compoundBody = Phaser.Physics.Matter.Matter.Body.create({
      parts: [ trashBody, trashSensor, ],
      inertia: Infinity
  });

  return game.matter.add
  .image(0, 0, 'trash')
  .setExistingBody(compoundBody)
  .setPosition(740, 540)
  .setStatic(true);
}