<template>
  <div
    :style="{
      transform: `translate3d(0, ${offset}px, 0)`,
      height: `${compensatedHeight}px`
    }"
    class="parallax-element"
  >

    <slot/>
  </div>
</template>

<script>
export default {
  name: 'ParallaxElement',
  inject: ['parallaxContainer'],
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
      const { height, scrollFactor, sizeFactor, direction } = this.parallaxContainer;

      if (direction === 'up') {
        return -this.totalMovement - (1 - scrollFactor) * -this.totalMovement;
      } else {
        return (1 - scrollFactor) * -this.totalMovement;
      }
    }
  },
};
</script>