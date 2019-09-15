import Phaser from "phaser";
import Butt from "./butt";

let cannonForce = 10;

let Cannon;
let Scene;

let butt;

function fireButt () {
  // Cannon.rotation = 0.41326526295069783; // TODO: temp
  if (!butt) {
    const {x, y} = Cannon.getCenter();

    let vx = -cannonForce * Math.sin(Cannon.rotation)
    let vy = -cannonForce * Math.cos(Cannon.rotation)

    butt = Butt(Scene, { x, y })
    butt.setVelocity(vx,vy)

    window.butt = butt
    window.Cannon = Cannon

    setTimeout(() => {
      butt.destroy();
      butt = null;
    }, 4000)
  }
}

function init(scene) {
  if (Cannon) return Cannon;


  Scene = scene;

  Cannon = Scene.matter.add
    .sprite(200, 300, "cannon", {
      originX: 0
    })
    .setDisplaySize(60, 10)
    .setOrigin(0, 0.5)
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
