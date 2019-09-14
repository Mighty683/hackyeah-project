import Phaser from "phaser";
// import Butt from "butt";

let Cannon;
let Scene;

let butt;

function loadButt () {
  if (!butt) {
    //noop
  }

}
function fireButt () {

}

function init(scene) {
  if (Cannon) return Cannon;

  window.Scene = Scene; // TODO: remove
  console.log(scene)

  Scene = scene;

  Cannon = Scene.matter.add
    .sprite(200, 300, "cannon", {
      originX: 0
    })
    .setDisplaySize(60, 10)
    .setOrigin(0, 0.5)
    .setStatic(true);

  Scene.input.keyboard.on('keydown_SPACE', loadButt);
  Scene.input.keyboard.on('keyup_SPACE', fireButt);

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
