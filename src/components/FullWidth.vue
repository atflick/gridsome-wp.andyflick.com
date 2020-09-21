<template>
  <div class="full-width">
    <div ref="component" class="full-width-outer">
      <div
        ref="image"
        class="full-width-image"
        :style="{ backgroundImage: `url(${fields.bgImage.url})`, height: `calc(100vh + ${this.offset}px)`}"
        data-image
      ></div>

      <div ref="content" class="full-width-inner" data-content>
        <div class="full-width-content">
          <h2 class="full-width-title -red-bg -white">{{ fields.title }}</h2>
          <p class="full-width-text -white">{{ fields.text }}</p>
          <a v-if="fields.link" :href="fields.link.url" class="button -white"><span>{{ fields.link.title }}</span></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TweenLite } from 'gsap';
import { getOffsetY } from '@/utils'

export default {
  data() {
    return {
      scrollY: 0,
      visible: false,
      currentPos: 0,
      offset: 250,
      scaleAmount: .15,
      requestId: false,
      prevScroll: null,
      ease: .075,
      requestId: false,
      ticking: false
    }
  },
  computed: {
    fields() {
      return {
        title: this.$attrs.fields.title,
        text: this.$attrs.fields.text,
        link: this.$attrs.fields.link,
        bgImage: this.$attrs.fields.background_image
      }
    },
    scrollYBottom() {
      return this.scrollY + this.windowHeight
    },
    inViewScroll() {
      return this.scrollY - this.componentOffset
    },
    translateFactor() {
      return this.offset / this.windowHeight
    },
    scrollFactor() {
      return this.inViewScroll / (this.componentHeight - this.windowHeight)
    }
  },
  mounted() {
    this.onResize()
    window.addEventListener('resize', this.onResize)
    window.addEventListener('scroll', this.onScroll)
  },
  destroyed() {
    window.removeEventListener('resize', this.onResize)
    window.addEventListener('scroll', this.onScroll)
  },
  methods: {
    parallax() {
      // console.log(this.scrollFactor);
      let target = 0;
      let scale = 1 + this.scaleAmount
      if (this.scrollFactor > 1) {
        target = this.offset
        scale = 1
      } else if (this.scrollFactor > 0 && this.scrollFactor < 1) {
        scale = Math.abs(((this.scrollFactor - 1) * this.scaleAmount) - 1)
        target = this.inViewScroll - (this.translateFactor * this.inViewScroll)
        this.visible = true
      }

      const dif = target - this.currentPos,
            delta = Math.abs(dif) < 0.1 ? 0 : dif * this.ease

      if (delta) {
        this.currentPos += delta
        this.requestId = requestAnimationFrame(this.parallax)
      } else {
        this.current = target
        this.ticking = false;
        cancelAnimationFrame(this.requestId)
      }
      // console.log('current:', this.currentPos, 'target:', target);

      this.moveElement({y: this.currentPos, scale})
    },
    requestTick() {
      if (!this.ticking) {
        this.ticking = true
        this.requestId = requestAnimationFrame(this.parallax)
      }
    },
    moveElement(movement) {
      TweenLite.set(this.$refs.image, movement)
    },
    onResize() {
      this.componentOffset = getOffsetY(this.$refs.component) + 15
      this.componentHeight = this.$refs.component.clientHeight
      this.componentOffsetBottom = this.componentOffset + this.componentHeight
      this.windowHeight = window.innerHeight
    },
    onScroll() {
      this.scrollY = window.scrollY
      // console.log('onscroll', this.scrollY);

      this.requestTick()
    }
  }
}
</script>

<style lang="scss">
  .full-width {
    overflow: hidden;
    position: relative;
    @include content-constraint;

    &-outer {
      padding-top: 50vh;
    }

    &-image {
      top: -50px;
      right: 0;
      left: 0;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      @include bg-pattern(absolute);
      transition: linear .0s;

      &.stuck {
        position: fixed;
      }
    }

    &-inner {
      position: relative;
      z-index: 2;
    }

    &-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      height: 100vh;
      max-width: 550px;
    }

    &-text {
      margin-top: 20px;
    }
  }
</style>