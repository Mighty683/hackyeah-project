<template>
  <div id="phaser-container" />
</template>

<script>
import Phaser from 'phaser';

function preload () {
    this.load.image('platform', 'assets/sprites/platform.png');
    this.load.image('thrash', 'assets/sprites/items.jpg');
}

function create ()
{
    this.matter.world.setBounds();

    //  Increase the solver steps from the default to aid with the stack
    this.matter.world.engine.positionIterations = 30;
    this.matter.world.engine.velocityIterations = 30;
    this.platform = this.matter.add.image(350, 450, 'platform', null, { isStatic: true }).setScale(2, 0.5).setAngle(10);
    // this.thrash = this.matter.add.image('thrash', { mass: 0.5 });

    this.matter.add.mouseSpring();
}

export default {
  data () {
    return {
      game: null,
      thrash: null,
      platform: null,
    }
  },

  mounted () {
    this.game =  new Phaser.Game({
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        backgroundColor: '#1b1464',
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