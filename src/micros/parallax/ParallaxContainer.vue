<template>
  <div class="parallax-container">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'ParallaxContainer',
  provide() {
    return {
      parallaxContainer: this.data,
    };
  },
  props: {
    factor: {
      default: 0.25,
      type: Number,
    },
    direction: {
      default: 'down',
      type: String
    }
  },
  data() {
    return {
      data: {
        height: 0,
        scrollFactor: 0,
        width: 0,
        sizeFactor: this.factor,
        direction: this.direction
      },
    };
  },
  mounted() {
    this.calcParallax();

    const eventHandler = () => requestAnimationFrame(this.calcParallax);
    window.addEventListener('resize', eventHandler);
    window.addEventListener('scroll', eventHandler);

    this.$on(`hook:destroyed`, () => {
      window.removeEventListener('resize', eventHandler);
      window.removeEventListener('scroll', eventHandler);
    });
  },
  methods: {
    calcParallax() {
      const containerRect = this.$el.getBoundingClientRect();

      this.data.height = containerRect.height;
      this.data.width = containerRect.width;

      const viewportOffsetTop = containerRect.top;
      const viewportOffsetBottom = window.innerHeight - viewportOffsetTop;

      this.data.scrollFactor = viewportOffsetBottom / (window.innerHeight + this.data.height);
    },
  },
}
</script>

<style lang="scss">
  .parallax-container {
    overflow: hidden;
  }
</style>