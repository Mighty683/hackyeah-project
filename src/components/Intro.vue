<template>
  <div class="intro">
    <div class="letter" v-for="(letter, index) in displayText" :key="index">
      <div class="wave-big">
        <div class="wave">
          <div class="twiggle">{{ letter }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Intro',

    data () {
      return {
        text: 'The text to be on the screen... and beyond!',
        displayText: '',
        currentLetter: 0,
      };
    },

    methods: {
      addLetter () {
        this.displayText += this.text[this.currentLetter];
        if (this.currentLetter < this.text.length - 1) {
          this.currentLetter++;
          this.renderText();
        }
      },

      renderText () {
        setTimeout(() => {
          this.addLetter();
        }, 100);
      },
    },

    mounted () {
      this.renderText();
    },
  };
</script>

<style lang="scss" scoped>
  @import "../assets/styles/animations";

  .intro {
    font-family: monospace;
    font-weight: bold;
    font-size: 8vw;
    white-space: nowrap;

    .letter {
      display: inline-block;
      width: 6vw;

    }
  }

</style>
