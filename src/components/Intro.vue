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
        text: 'Be aware, human! Some of us it makes happy, some sad. But the truth is it might harm. And I am not talking about ourselves but others and especially the environment. So remember to clean after yourself if you do not want to be digged in cigarette butts!',
        displayText: '',
        currentLetter: 0,
        textWidth: 0,
        scrollPosition: 0,
        scrollStep: 100,
        timeout: null,
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
        this.timeout = setTimeout(() => {
          this.addLetter();
        }, 50);
      },

      countSize () {
        const viewportWidth = document.querySelector('body').offsetWidth;

        this.textWidth = this.$refs.intro.offsetWidth + viewportWidth;
        this.scrollStep = Math.round(viewportWidth * 0.3);
      },

      scroll () {
        if (this.scrollPosition >= this.textWidth) {
          this.scrollPosition = 0;
          this.$emit('scroll-repeat');
        } else {
          this.scrollPosition += this.scrollStep;
        }
      },

      startMusic () {
        const audio = new Audio('MoveYourButt.mp3');

        audio.play();
      },
    },

    mounted () {
      this.renderText();
      this.$el.addEventListener(transitionEvent, this.scroll);
    },

    destroyed () {
      this.$el.removeEventListener(transitionEvent, this.scroll);
      clearTimeout(this.timeout);
    },

    watch: {
      textWidth (newValue) {
        if (newValue > 0) {
          this.scroll();
          this.startMusic();
          this.$emit('ready');
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
    text-shadow: 0 0 10px #10fd97;
    color: darkslategrey;

    .letter {
      display: inline-block;
      width: 6vw;
    }
  }
</style>
