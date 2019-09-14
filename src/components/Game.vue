<template>
  <div id="phaser-container" />
</template>

<script>
import Phaser from "phaser";
import level from "../data/level";
import { EventBusEventsEnum } from "../event-bus/event-bus";
function preload() {
  this.load.image("textures", "textures.png");
    // TODO: add cannon sprite
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
  game.matter.add.image(10, 200, "balls", 5);
}

function create() {
  this.matter.world.setBounds(0, 0, 800, 580);
  createTileMap(this);
  initMatter(this);
  this.input.on("pointerdown", function(pointer) {
    eventBus.dispatchEvent(EventBusEventsEnum.ENTITY_CLICKED, { elo: "elo" });
  });
    this.cannon = this.matter.add.sprite(200, 300, 'cannon', {
        originX: 0,
    })
      .setDisplaySize(60, 10)
      .setOrigin(0, .5)
      .setStatic(true)
}

function update (time, delta) {
    let {x,y} = this.input.activePointer;
    this.cannon.rotation = Phaser.Math.Angle.Between(this.cannon.x, this.cannon.y, x, y);
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
        update: update,
      }
    });
  }
};
</script>