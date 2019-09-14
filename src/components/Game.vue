<template>
  <div id="phaser-container" />
</template>

<script>
import Phaser from 'phaser';
import level from '../data/level'
function preload () {
    this.load.image('textures', 'textures.png');
}
function createTileMap (game) {
  const map = game.make.tilemap({
    data: level,
    tileWidth: 40,
    tileHeight: 40,
  })
  const tiles = map.addTilesetImage('textures')
  map.createStaticLayer(0, tiles, 0, 0);
}

function initMatter (game) {
  game.matter.add.image(10, 200, 'balls', 5);
}

function create () {
    this.matter.world.setBounds(0, 0, 800, 580);
    createTileMap(this);
    initMatter(this);

}

export default {
  data () {
    return {
      game: null,
    }
  },

  mounted () {
    this.game =  new Phaser.Game({
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        backgroundColor: '#03b6fc',
        parent: 'phaser-container',
        physics: {
          default: 'matter',
          matter: {
            debug: true,
            gravity: {
              y: 0.3
            },
          }
        },
        scene: {
          preload: preload,
          create: create,
        }
      })
  },
}
</script>