<template>
  <div
    :style="{ height: `${compensatedHeight}px` }"
    class="parallax-element"
    ref="parallaxElement"
  >

    <slot/>
  </div>
</template>

<script>
import { TweenLite } from 'gsap';

export default {
  name: 'ParallaxElement',
  inject: ['parallaxContainer'],
  mounted() {
    this.moveElement(this.offset)
  },
  computed: {
    totalMovement() {
      const { height, sizeFactor } = this.parallaxContainer;
      return height * sizeFactor;
    },
    compensatedHeight() {
      const { height } = this.parallaxContainer;
      return height + this.totalMovement;
    },
    offset() {
      const { height, y, sizeFactor, direction } = this.parallaxContainer;
      const adjustedY = y > 0 ? y < 1 ? y : 1 : 0;

      if (direction === 'up') {
        return -this.totalMovement - (1 - adjustedY) * -this.totalMovement;
      } else {
        return (1 - adjustedY) * -this.totalMovement;
      }
    }
  },
  methods: {
    moveElement(offset) {
      TweenLite.set(this.$refs.parallaxElement, { y: offset});
    }
  },
  watch: {
    offset(newOffset, oldOffset) {
      this.moveElement(newOffset);
    }
  }
};
</script>