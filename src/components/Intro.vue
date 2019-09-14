<template>
  <div class="intro" ref="intro" :style="`transform: translateX(calc(100vw - ${scrollPosition}px))`">
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
  const whichTransitionEvent = () => {
    const el = document.createElement('fakeelement');

    let transitions = {
      'transition': 'transitionend',
      'OTransition': 'oTransitionEnd',
      'MozTransition': 'transitionend',
      'WebkitTransition': 'webkitTransitionEnd',
    };

    for (let t in transitions) {
      if (el.style[t] !== undefined) {
        return transitions[t];
      }
    }
  };

  const transitionEvent = whichTransitionEvent();

  export default {
    name: 'Intro',

    data () {
      return {
        text: 'The text to be on the screen... and beyond!',
        displayText: '',
        currentLetter: 0,
        textWidth: 0,
        scrollPosition: 0,
        scrollStep: 100,
      };
    },

    methods: {
      addLetter () {
        this.displayText += this.text[this.currentLetter];
        if (this.currentLetter < this.text.length - 1) {
          this.currentLetter++;
          this.renderText();
        } else {
          this.countSize();
        }
      },

      renderText () {
        setTimeout(() => {
          this.addLetter();
        }, 100);
      },

      countSize () {
        const viewportWidth = document.querySelector('body').offsetWidth;

        this.textWidth = this.$refs.intro.offsetWidth + viewportWidth;
      },

      scroll () {
        if (this.scrollPosition >= this.textWidth) {
          this.scrollPosition = 0;
        } else {
          this.scrollPosition += this.scrollStep;
        }
      },
    },

    mounted () {
      this.renderText();
      this.$el.addEventListener(transitionEvent, this.scroll);
    },

    destroyed () {
      this.$el.removeEventListener(transitionEvent, this.scroll);
    },

    watch: {
      textWidth (newValue) {
        if (newValue > 0) {
          this.scroll();
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "../assets/styles/animations";

  .intro {
    display: inline-block;
    font-family: monospace;
    font-weight: bold;
    font-size: 8vw;
    white-space: nowrap;
    transition: 1s transform ease-in-out;
    text-shadow: 10px 10px 17px grey;

    .letter {
      display: inline-block;
      width: 6vw;

    }
  }
</style>
