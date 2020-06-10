<template>
  <div ref="container" class="parallax-container">
    <slot/>
  </div>
</template>

<script>
import { getOffsetY } from '@/utils'

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
      scrollY: 0,
      requestId: null,
      scrolling: true,
      ease: 0.05
    };
  },
  mounted() {
    this.onLoad();
    this.onResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('scroll', this.onScroll);
  },
  computed: {
    inView() {
      if (this.scrollY <= this.bottom && this.scrollY + window.innerHeight >= this.top) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    onLoad() {
      this.onResize();
      this.calcParallax();
      window.addEventListener('resize', this.onResize);
      window.addEventListener('scroll', this.onScroll);
    },
    calcParallax() {
      const viewportOffsetTop = this.top - this.scrollY;
      const viewportOffsetBottom = window.innerHeight - viewportOffsetTop;
      const endScroll = viewportOffsetBottom / (window.innerHeight + this.data.height);

      this.data.scrollFactor = endScroll;

      this.data.y += (this.data.scrollFactor - this.data.y) * this.ease;

      if (Math.abs(endScroll - this.data.y) <= 0.01) {
        this.data.y = endScroll;
        this.scrolling = false;
      }

      this.requestId = this.scrolling ? requestAnimationFrame(this.calcParallax) : null
    },
    onScroll() {
      this.scrolling = true;
      this.scrollY = window.scrollY

      if (!this.requestId && this.inView) {
        this.requestId = requestAnimationFrame(this.calcParallax);
      }
    },
    onResize() {
      const top = getOffsetY(this.$el)
      this.top = top
      this.bottom =  top + this.data.height
      const containerRect = this.$el.getBoundingClientRect();

      this.data.height = containerRect.height;
      this.data.width = containerRect.width;
    }
  },
}
</script>

<style lang="scss">
  .parallax-container {
    overflow: hidden;
  }
</style>