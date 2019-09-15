import Phaser from 'phaser';
let Bodies = Phaser.Physics.Matter.Matter.Bodies;

export default (game, startX, startY, collisionGroup) => {

  let fanBody = Bodies.rectangle(0, 0, 40, 40, {
    label: 'fan'
  });
  let fanSensor = Bodies.rectangle(0, -100, 40, 200, { isSensor: true, label: 'fan-sensor' });
  let compoundBody = Phaser.Physics.Matter.Matter.Body.create({
      parts: [ fanBody, fanSensor ],
      inertia: Infinity
  });
  let fan = game.matter.add
    .image(0, 0, 'vent')
    .setExistingBody(compoundBody)
    .setDisplayOrigin(20,-64)
    .setCollisionGroup(collisionGroup)
    .setPosition(startX, 200 || startY)
    .setStatic(true)
    .setInteractive()
    .setIgnoreGravity(true)
    .on('pointerdown', function () {
      this.setStatic(false)
    })
    .on('pointerup', function (pointer) {
      if (pointer.getDistance() < 10) {
        this.angle += 90
      }
      this.setStatic(true)
    })

  return fan
}