<template>
  <div ref="container" class="parallax-container" :style="containerStyle">
    <Observer :class="{ absolute: absolute }" :callback="inView" :negative-callback="outOfView" :options="{ rootMargin: '0px' }">
      <div ref="image" class="parallax-container-image" :style="style">
        <slot><g-image :src="imageUrl" 
                       :class="{ 'image-loaded': imageLoaded }" 
                       @load="imageLoaded = true" /></slot>
      </div>
    </Observer>
  </div>
</template>

<script>
import Observer from '../Observer'
import { getOffsetY, debounce } from '@/utils'
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
    imageUrl: {
      default: '',
      type: String
    },
    heightOffset: {
      default: 200,
      type: Number
    },
    hideOverflow: {
      default: true,
      type: Boolean
    },
    absolute: {
      default: true,
      type: Boolean
    }
  },
  data() {
    return {
      el: '',
      bounds: {},
      windowHeight: 0,
      ease: .075,
      current: 0,
      target: 0,
      rafId: undefined,
      rafActive: false,
      initial: true,
      totalScroll: 0,
      initialScrollPos: 0,
      eventOff: true,
      factor: 0,
      y: 0,
      imageLoaded: false
    }
  },
  mounted() {
    // this.onLoad();
    this.el = this.$refs.image
    if (process.isClient) {
      this.windowHeight = window.innerHeight;
      window.addEventListener('resize', this.onResize);
    }
  },
  destroyed() {
    if (process.isClient) {
      window.removeEventListener('resize', this.onResize);
    }
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
        // backgroundImage: this.imageUrl ? `url(${this.imageUrl})` : '',
        height: `calc(100% + ${this.heightOffset}px)`
      }
    },
    containerStyle() {
      return {
        overflow: this.hideOverflow ? 'hidden' : 'visible'
      }
    }
  },
  watch: {
    bounds(newBounds) {
      let offsetTop = getOffsetY(this.el);
      offsetTop = offsetTop < this.windowHeight ? offsetTop : this.windowHeight;
      this.totalScroll = this.$refs.container.clientHeight + offsetTop;
      // this.direction = newBounds.bottom > newBounds.top ? 'up' : 'down';
    }
  },
  methods: {
    loadImage() {

    },
    onResize() {
      this.windowHeight = window.innerHeight;
      this.bounds = this.el.getBoundingClientRect();
    },
    inView(target, index, intersectionPoint, entry) {
      const { isIntersecting, boundingClientRect } = entry
      if (this.initial) {
        this.bounds = boundingClientRect
        this.current = window.scrollY;
        this.scrollHandler();
        this.initial = false;
      }
      
      if (intersectionPoint === 'top') {
        this.initialScrollPos = window.scrollY;
      } else {
        this.initialScrollPos = window.scrollY - this.totalScroll;
      }
      window.addEventListener('scroll', this.scrollHandler)
      this.eventOff = false;
    },
    outOfView() {
      window.removeEventListener('scroll', this.scrollHandler);
      this.eventOff = true;
    },
    scrollHandler() {
      this.target = window.scrollY;
      if (!this.rafActive) {
        this.rafActive = true;
        this.animate();
      }
    },
    decimalize(num, decimal = 2) {
      return parseFloat(num.toFixed(decimal));
    },
    animate() {
      const diff = this.target - this.current;
      // `delta` is the value for adding to the `current` scroll position
      // If `diff < 0.1`, make `delta = 0`, so the animation would not be endless
      const delta = Math.abs(diff) < .5 ? 0 : diff * this.ease;
      if (delta) {
        this.current += delta;
        this.rafId = requestAnimationFrame(this.animate);
      } else {
        this.current = this.target;
        this.rafActive = false;
        cancelAnimationFrame(this.rafId);
      }

      const scrollDiff = this.current - this.initialScrollPos;
      const factor = scrollDiff / this.totalScroll;

      if (factor > 1) {
        this.factor = 1;
      } else if (factor < 0) {
        this.factor = 0;
      } else  {
        this.factor = factor;
      }

      this.updateAnimation(this.factor)
    },
    updateAnimation(factor) {
      if (this.direction === 'up') {
        this.y = this.heightOffset * factor
      } else {
        this.y = this.heightOffset * (1 - factor)
      }

      TweenLite.set(this.el, { y: -this.y, rotate: .0001 });
    }
  },
}
</script>

<style lang="scss">
  .parallax-container {
    position: relative;
    overflow: hidden;

    &-image {
      position: relative;
      // background-size: cover;
      // background-position: center;
      // background-repeat: no-repeat;
      -webkit-transform-style: preserve-3d;
      -webkit-backface-visibility: hidden;

      img {
        height: 100%;
        object-fit: cover;
        opacity: 0;
        transition: .5s ease-in-out;

        &.image-loaded {
          opacity: 1;
        }
      }
    }

    .absolute {
      @include absolute(0, 0, 0, 0);
    }
  }
</style>