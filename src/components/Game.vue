<template>
  <div>
    <div id="phaser-container" />
    <div class="instructions">
      <p class="rainbow-text">Goals:</p>
      <p>Don't litter, throw cig butt into bin.</p>
      <p class="rainbow-text">Instructions:</p>
      <div>
        <ul>
          <li>
            Help with boosters to omit the walls.
          </li>
          <li>
            Press SPACE to throw a butt.
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
  .instructions {
    text-align: center;
  }
  .rainbow-text {
    font-size: 3rem;
    margin: 0;
    background-image: linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>
<script>
import Phaser from "phaser";

import wallsLabirynth from "../data/walls";
import level from "../data/level";

import Trash from "../game/trash";
import Cannon from "../game/cannon";
import Fan from "../game/fan";
import Wall from "../game/wall";

import EventBus from "../event-bus/event-bus";

const score = {
  lose: null, win: null,
};
const currentScore = {
  lose: 0, win: 0,
};

function preload() {
  this.load.image("textures", "textures.png");
  this.load.image("trash", "trash.png");
  this.load.image("wall", "wall.png");
  this.load.image("vent", "vent.png");
  this.load.image("butt", "cigarrete_final.png");
  this.load.image('font', 'font.png');
}


function handleButtCollision(game, butt, target) {
  if (target.label === "trash") {
    butt.gameObject._hit = true
    EventBus.$emit("win-game");
  }
  if (target.label === 'ground' && !butt.gameObject._dead) {
    butt.gameObject._dead = true
    EventBus.$emit("lost-point");
  }
  if (target.label === 'fan-sensor') {
    butt.gameObject._fanForce = target.gameObject.getTopRight()
      .subtract(butt.gameObject.getCenter()).negate().scale(1/6000)
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

function createFontSprite (game) {
  score.lose = game.add.tileSprite(0, 0, 40, 40, 'font').setTint(0xFF5733);
  score.win = game.add.tileSprite(0, 0, 40, 40, 'font').setTint(0x39FE0D);
  score.lose.x = 700;
  score.lose.y = 40;
  score.lose.tilePositionX = 0;
  score.lose.tilePositionY = 80;
  score.win.x = 760;
  score.win.y = 40;
  score.win.tilePositionX = 0;
  score.win.tilePositionY = 80;
}

function updateScore (side = 'lose') {
  currentScore[side]++;
  score[side].tilePositionX = 40 * currentScore[side];
}

function resetScore() {
  currentScore.win = 0
  currentScore.lose = 0
  score.lose.tilePositionX = 0
  score.win.tilePositionX = 0
}

function initMatter(game) {
  let mouseCollision = game.matter.world.nextGroup();
  game.matter.add
    .rectangle(400, 590, 800, 20, { label: 'ground', isStatic: true })

  Trash(game);
  game.fan1 = Fan(game, 50, 50, mouseCollision);
  game.fan2 = Fan(game, 100, 50, mouseCollision);
  game.fan3 = Fan(game, 150, 50, mouseCollision);
  game.fan4 = Fan(game, 200, 50, mouseCollision);
  wallsLabirynth.forEach(element => {
      Wall(game, element);
  });

  game.matter.add.mouseSpring({
    length: 1,
    stiffness: 1,
    collisionFilter: { group: mouseCollision }
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
  this.matter.world.setBounds(0, 0, 800, 600);
  createTileMap(this);
  createFontSprite(this);
  initMatter(this);
  Cannon.init(this);
}

function update() {
  Cannon.update();
  this.butts && this.butts.forEach(butt => {
    if (!butt._dead && butt._fanForce) {
      butt.applyForce(butt._fanForce)
      butt._fanForce = 0;
    } else if (butt._dead && butt._hit) {
      butt.destroy()
      butt.setVisible(false)
      this.butts.splice(this.butts.indexOf(butt), 1)
    }
  })
}

export default {
  data() {
    return {
      game: null
    };
  },

  mounted() {
    let that = this
    this.game = new Phaser.Game({
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      backgroundColor: "#03b6fc",
      parent: "phaser-container",
      physics: {
        default: "matter",
        matter: {
          debug: process.env.NODE_ENV === "development",
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

    EventBus.$on('win-game', () => {
      updateScore('win');
      if (currentScore.win >= 5) {
        EventBus.$emit('show-modal', 'Congratulations! You are a clean person! The world would be proud.')
        that.game.paused = true
        EventBus.$once('modal-closed', () => {
          that.game.paused = false
          resetScore()
        })
      }
    });

    EventBus.$on('lost-point', function () {
      let finished = false
      updateScore('lose')

      if (currentScore.lose >= 5) {
        EventBus.$emit('show-modal', 'You lose. You are lying under butts!')
        finished = true
      } else {
        EventBus.$emit('show-modal')
      }
      that.game.paused = true
      EventBus.$once('modal-closed', () => {
        that.game.paused = false
        if (finished) {
          resetScore()
        }
      })
    })
  }
};
</script>
