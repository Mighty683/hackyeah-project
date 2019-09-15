import Phaser from "phaser";
import Butt from "./butt";

let cannonForce = 15;

let Cannon;
let Scene;

let butt;

function fireButt () {
  if (!butt || butt._dead || butt._hit) {
    const {x, y} = Cannon.getCenter();

    const vx = cannonForce * Math.cos(Cannon.rotation)
    const vy = cannonForce * Math.sin(Cannon.rotation)

    Cannon.anims.play('shot', true);  
    butt = Butt(Scene, { x, y: y - 5 })
    butt.setVelocity(vx,vy)
  }
}

function init(scene) {
  if (Cannon) return Cannon;


  Scene = scene;

  Cannon = Scene.matter.add
  .sprite(0, 0, "cannon")
  .setCollisionCategory(scene.matter.world.nextGroup())
  .setPosition(50, 500)
  .setStatic(true)
  .toggleFlipX()

  Scene.anims.create({
    key: 'shot',
    frames: Scene.anims.generateFrameNumbers('cannon', { start: 0, end: 13 }),
    frameRate: 10,
    repeat: -1
  });
  
  Scene.input.keyboard.on('keyup_SPACE', fireButt);

  // Scene.input.on('pointerdown', ({ x, y }) => console.log(`POINTER: ${x}, ${y}`))

  return Cannon;
}

function update() {
  let { x, y } = Scene.input.activePointer;
  Cannon.rotation = Phaser.Math.Angle.Between(
    Cannon.x,
    Cannon.y,
    x,
    y
  );
}

export default {
  init,
  update,
};
