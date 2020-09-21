<template>
  <div ref="container" class="parallax-container">
    <Observer :callback="observerHandler" :options="{ rootMargin: '0px' }">
      <div ref="image" class="parallax-image-container" :style="style"></div>
    </Observer>
  </div>
</template>

<script>
import Observer from '../Observer'
import { getOffsetY } from '@/utils'
import { TweenLite } from 'gsap';

export default {
  name: 'ParallaxContainer',
  components: {
    Observer
  },
  props: {
    direction: {
      default: 'down',
      type: String
    },
    imageUrl: String,
    heightOffset: {
      default: 400,
      type: Number
    }
  },
  data() {
    return {
      el: '',
      bounds: {},
      windowHeight: window.innerHeight,
      ease: .075,
      current: 0,
      target: 0,
      rafId: undefined,
      rafActive: false,
      initial: true,
      totalScroll: 0,
      initialScrollPos: 0,
      factor: 0,
      y: 0
    }
  },
  mounted() {
    // this.onLoad();
    this.el = this.$refs.image
    this.onResize();
    window.addEventListener('scroll', this.scrollHandler)
    window.addEventListener('resize', this.onResize);
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollHandler);
    window.removeEventListener('resize', this.onResize);
  },
  computed: {
    scrollHeight() {
      if (this.bounds.y < this.windowHeight) {
        return this.bounds.height + this.bounds.y
      } else {
        return this.bounds.height + this.windowHeight
      }
    },
    style() {
      return {
        backgroundImage: `url(${this.imageUrl})`,
        height: `calc(100% + ${this.heightOffset}px)`
      }
    }
  },
  watch: {
    bounds(newBounds) {
      this.totalScroll = newBounds.height + window.innerHeight;
      this.direction = newBounds.bottom > newBounds.top ? 'up' : 'down';
      this.initialScrollPos = window.scrollY - (window.innerHeight - newBounds.top);
    },
    factor(newFactor) {
      if (this.direction === 'up') {
        this.y = this.heightOffset * newFactor
      } else {
        this.y = this.heightOffset * (1 - newFactor)
      }
    }
  },
  methods: {

    onResize() {
      this.bounds = this.el.getBoundingClientRect()
    },
    observerHandler(target, index, intersectionPoint, entry) {
      const { isIntersecting, boundingClientRect } = entry
      // console.log(boundingClientRect);
      if (this.initial) {
        this.bounds = boundingClientRect
        this.current = window.scrollY;
        this.scrollHandler();
        this.initial = false;
      }

      if (isIntersecting) {
        console.log('in view');
        this.inView(true);
      } else if (!isIntersecting) {
        console.log('out of view');
        this.inView(false);
      }
    },
    inView(turnEventOn) {
      // console.log(bounds);
      if (turnEventOn && this.eventOff) {

        this.eventOff = false;
      } else if (!turnEventOn && !this.eventOff) {
        this.eventOff = true;
      }
    },
    setBoundsScroll(bounds) {
      this.direction = bounds.bottom > bounds.top ? 'up' : 'down';
      console.log(bounds);
      this.initialScrollPos = window.scrollY - (window.innerHeight - bounds.top);
      this.bounds = bounds;
    },
    scrollHandler() {
      if (this.eventOff) {
        return;
      }

      this.target = window.scrollY;
      this.animate();
    },
    decimalize(num, decimal = 2) {
      return parseFloat(num.toFixed(decimal));
    },
    animate() {
      const diff = this.target - this.current;
      // `delta` is the value for adding to the `current` scroll position
      // If `diff < 0.1`, make `delta = 0`, so the animation would not be endless
      const delta = Math.abs(diff) < 0.1 ? 0 : diff * this.ease;

      if (delta) {
        this.current += delta;
        this.current = this.decimalize(this.current);
        this.rafId = requestAnimationFrame(this.animate);
      } else {
        this.current = this.target;
        this.rafActive = false;
        cancelAnimationFrame(this.rafId);
      }

      const scrollDiff = this.decimalize(this.current - this.initialScrollPos);

      const factor = this.decimalize(scrollDiff / this.totalScroll);
      // console.log(factor);
      if (factor > 1) {
        this.factor = 1;
      } else if (factor < 0) {
        this.factor = 0;
      } else  {
        this.factor = factor;
      }

      this.updateAnimation(this.factor)
    },
    updateAnimation() {
      TweenLite.set(this.el, { y: -this.y, rotate: .00001 });
    }
  },
}
</script>

<style lang="scss">
  .parallax-container {
    overflow: hidden;

    .observer {
      @include absolute(0, 0, 0, 0);
    }
  }
</style>