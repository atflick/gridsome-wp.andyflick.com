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
        direction: this.direction,
        y: 0
      },
      requestId: null,
      scrolling: true,
      ease: 0.05
    };
  },
  mounted() {

    this.onLoad();

    this.$on(`hook:destroyed`, () => {
      window.removeEventListener('resize', this.onScroll);
      window.removeEventListener('scroll', this.onScroll);
    });
  },
  methods: {
    onLoad() {
      this.calcParallax();
      window.addEventListener('resize', this.onScroll);
      window.addEventListener('scroll', this.onScroll);
    },
    calcParallax() {
      const containerRect = this.$el.getBoundingClientRect();

      this.data.height = containerRect.height;
      this.data.width = containerRect.width;

      const viewportOffsetTop = containerRect.top;
      const viewportOffsetBottom = window.innerHeight - viewportOffsetTop;
      const endScroll = viewportOffsetBottom / (window.innerHeight + this.data.height);

      this.data.scrollFactor = endScroll;
      this.data.y += (this.data.scrollFactor - this.data.y) * this.ease;

      if (Math.abs(endScroll - this.data.y) <= 0.001) {
        this.data.y = endScroll;
        this.scrolling = false;
      }

      this.requestId = this.scrolling ? requestAnimationFrame(this.calcParallax) : null
    },
    onScroll() {
      this.scrolling = true;
      if (!this.requestId) {
        this.requestId = requestAnimationFrame(this.calcParallax);
      }
    }
  },
}
</script>

<style lang="scss">
  .parallax-container {
    overflow: hidden;
  }
</style>