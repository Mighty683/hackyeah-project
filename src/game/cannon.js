import Phaser from "phaser";
import Butt from "./butt";
let Bodies = Phaser.Physics.Matter.Matter.Bodies;

let cannonForce = 10;

let Cannon;
let Scene;

let butt;

function fireButt () {
  if (!butt) {
    const {x, y} = Cannon.getCenter();

    const vx = cannonForce * Math.cos(Cannon.rotation)
    const vy = cannonForce * Math.sin(Cannon.rotation)

    butt = Butt(Scene, { x, y })
    butt.setVelocity(vx,vy)
    butt.setAngularVelocity(.3)

    setTimeout(() => {
      if (!butt._dead) {
        butt.destroy();
        butt = null;
      }
    }, 4000)
  }
}

function init(scene) {
  if (Cannon) return Cannon;


  Scene = scene;

  Cannon = Scene.matter.add
    .image(0, 0, "cannon",)
    .setExistingBody(Bodies.rectangle(0, 0, 20, 60, {
      label: 'butt'
    }))
    .setCollisionCategory(scene.matter.world.nextGroup())
    .setDisplaySize(60, 10)
    .setPosition(50, 500)
    .setStatic(true);

  // Scene.input.keyboard.on('keydown_SPACE', loadButt);
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
