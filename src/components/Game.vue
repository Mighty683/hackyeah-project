<template>
  <div id="phaser-container" />
</template>

<script>
import Phaser from "phaser";

import wallsLabirynth from "../data/walls";
import level from "../data/level";

import Trash from "../game/trash";
import Butt from "../game/butt";
import Fan from "../game/fan";
import Wall from "../game/wall";

import EventBus from "../event-bus/event-bus";

let Vector = Phaser.Math.Vector2;

function preload() {
  this.load.image("textures", "textures.png");
  this.load.image("trash", "trash.png");
  this.load.image("wall", "wall.png");
}


function handleButtCollision(game, butt, target) {
  if (target.label === "trash") {
    EventBus.$emit("win-game");
  }
  if (target.label === 'fan-sensor') {
    butt.gameObject._fanForce = new Vector(target.gameObject.body.vertices[0]).subtract(butt.gameObject.getCenter())
  }
}


function createTileMap(game) {
  const map = game.make.tilemap({
    data: level,
    tileWidth: 40,
    tileHeight: 40
  });
  const tiles = map.addTilesetImage("textures");
  map.createStaticLayer(0, tiles, 0, 0);
}

function initMatter(game) {
  // Draggable items
  let dragGroup = game.matter.world.nextGroup();

  Trash(game);
  game.fan1 = Fan(game, 50, 50);
  game.fan2 = Fan(game, 100, 50);
  game.fan3 = Fan(game, 150, 50);
  game.fan4 = Fan(game, 200, 50);
  game.butt = Butt(game, dragGroup);
  wallsLabirynth.forEach(element => {
      Wall(game, element);
  });

  game.matter.add.mouseSpring({
    length: 1,
    stiffness: 0.3,
    collisionFilter: { group: dragGroup }
  });

  game.matter.world.on("collisionstart", function(event, bodyA, bodyB) {
    let butt, target;
    if (bodyA.label === "butt") {
      butt = bodyA;
      target = bodyB;
    } else if (bodyB.label === "butt") {
      butt = bodyB;
      target = bodyA;
    }
    if (butt) {
      handleButtCollision(game, butt, target, event);
    }
  });
}

function create() {
  this.matter.world.setBounds(0, 0, 800, 580);
  createTileMap(this);
  initMatter(this);
  this.cannon = this.matter.add
    .sprite(200, 300, "cannon", {
      originX: 0
    })
    .setDisplaySize(60, 10)
    .setOrigin(0, 0.5)
    .setStatic(true);
}

function update(time, delta) {
  let { x, y } = this.input.activePointer;
  this.cannon.rotation = Phaser.Math.Angle.Between(
    this.cannon.x,
    this.cannon.y,
    x,
    y
  );
  if (this.butt._fanForce) {
    this.butt.applyForce(this.butt._fanForce.negate().scale(1/30000))
    this.butt._fanForce = 0;
  }
}

export default {
  data() {
    return {
      game: null
    };
  },

  mounted() {
    this.game = new Phaser.Game({
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      backgroundColor: "#03b6fc",
      parent: "phaser-container",
      physics: {
        default: "matter",
        matter: {
          debug: true,
          gravity: {
            y: 0.3
          }
        }
      },
      scene: {
        preload: preload,
        create: create,
        update: update
      }
    });
  }
};
</script>