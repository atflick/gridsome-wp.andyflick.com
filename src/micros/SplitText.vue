<template>
  <Observer :tag="tag" :callback="triggerAnimation">
    <template v-if="loading" :style="{ opacity: delayStart ? 1 : 0 }">
      <span v-for="(word, l) in splitChars" :key="`${l}-word`" class="split-text-word">
        <span v-for="(c, i) in word" 
              :key="`${l}-${i}-letter`" 
              v-bind:style="{ animationDuration: speed + 'ms', animationDelay: calcDelay(l, i) }" 
              class="split-text-char"
              :class="{ [name]: animating }"
              v-html="c"
              ></span>
        <span v-if="l !== splitChars.length - 1" class="split-text-space">&nbsp;</span>  
      </span>
    </template>
    <template v-if="!loading">
      {{ text }}
    </template>
  </Observer>
</template>

<script>
import Observer from './Observer';
let iteration = 0;
export default {
  name: 'SplitText',
  components: {
    Observer
  },
  props: {
    text: {
      type: String,
      default: ''
    },
    tag: {
      type: String,
      default: 'div'
    },
    speed: {
      type: Number,
      default: 150
    },
    initialDelay: {
      default: 250
    },
    delay: {
      type: Number,
      default: 20
    },
    name: {
      type: String,
      default: 'fade-in'
    },
  },
  data() {
    return {
      words: this.text.split(' '),
      animating: false,
      loading: true
    }
  },
  computed: {
    splitChars() {
      return this.words.map((word) => {
        return word.split('');
      })
    }
  },
  mounted() {
    iteration = 1;
    const timer = this.text.length * this.delay + 1000;
    setTimeout(() => {
      // this.loading = false;
    }, timer);
  },
  methods: {
    triggerAnimation() {
      this.animating = true;
    },
    calcDelay(w, c) {
      const msDelay = (iteration * this.delay) + this.initialDelay;
      iteration++
      return `${msDelay}ms`;
    },
    delayStart() {
      setTimeout(() => {
        return true
      }, this.initialDelay)
    }
  }
}
</script>

<style lang="scss" scoped>
  .split-text {
    &-word {
      display: inline-block;
    }

    &-char {
      opacity: 0;  
      display: inline-block;
      animation-fill-mode: both;
    }

    &-space {
      display: inline;
    }
  }

  @keyframes transform-in {
    0% {
      transform: matrix(0.35,-0.10,-0.50,0.89,34,-11);
      opacity: 0;
    }
    10% {
      opacity: .8;
    }

    100% {
      transform: matrix(0, 0, 0, 0,3 0, 0);
      opacity: 1;
    }
  }

  .transform-in {
    opacity: 1;
    animation-name: transform-in;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  .fade-in {
    animation-name: fadeIn;
  }

  @keyframes rotateInDownRight {
    from {
      transform: rotate3d(0, 0, 1, -95deg);
      opacity: 0;
    }

    to {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }
  .rotate-in-down-right {
    animation-name: rotateInDownRight;
    transform-origin: right bottom;
  }
</style>