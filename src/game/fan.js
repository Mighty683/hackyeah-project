import Phaser from 'phaser';
let Bodies = Phaser.Physics.Matter.Matter.Bodies;

export default (game, startX, startY, collisionGroup) => {

  let fanBody = Bodies.rectangle(0, 0, 40, 40);
  let fanSensor = Bodies.rectangle(0, -80, 10, 200, { isSensor: true, label: 'fan-sensor' });
  let compoundBody = Phaser.Physics.Matter.Matter.Body.create({
      parts: [ fanBody, fanSensor, ],
      inertia: Infinity
  });
  let fan = game.matter.add
  .image(-100, 0, 'fan')
  .setExistingBody(compoundBody)
  .setCollisionGroup(collisionGroup)
  .setPosition(startX, startY)
  .setStatic(true);

  return fan
}