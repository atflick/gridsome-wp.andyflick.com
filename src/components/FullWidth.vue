<template>
  <div class="full-width">
    <div ref="component" class="full-width-outer">
      <div
        ref="image"
        class="full-width-image"
        :class="{ stuck: imageStuck }"
        :style="{ backgroundImage: `url(${fields.bgImage.url})`, ...this.imageStyle, ...this.transform }"
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
export default {
  data() {
    return {
      scrollY: 0,
      visible: false,
      baseLine: 0,
      offset: 150,
      imageStyle: {
        top: 0,
        bottom: 'auto'
      },
      transform: {
        transform: 'translateY(0) scale(1.1)'
      }
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
    imageStuck() {
      if (this.scrollY < this.componentOffset) {
        this.imageStyle = { top: 0, bottom: 'auto' }
        return false
      } else if (this.scrollY >= this.componentOffset && this.scrollYBottom <= this.componentOffsetBottom) {
        this.scrollFactor = (this.scrollY - this.componentOffset) / (this.componentHeight - this.windowHeight)
        const scale = ((this.scrollFactor - 1) * .1) - 1
        this.transform = { transform: `translateY(-${this.offset * this.scrollFactor}px) scale(${-scale})`}

        this.visible = true
        return true
      } else if (this.scrollYBottom > this.componentOffsetBottom) {
        this.imageStyle = { top: 'auto', bottom: 0 }
        this.imageStyle = { top: 'auto', bottom: `-${this.offset}px` }
        return false
      }
    },
    scrollYBottom() {
      return this.scrollY + this.windowHeight
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
    onResize() {
      console.dir(this.$refs.component);
      this.componentOffset = this.getOffsetY(this.$refs.component)
      this.componentHeight = this.$refs.component.clientHeight
      this.componentOffsetBottom = this.componentOffset + this.componentHeight
      this.windowHeight = window.innerHeight
    },
    onScroll() {
      this.scrollY = window.scrollY
    },
    getOffsetY(el) {
      let yPosition = 0;

      while(el) {
        yPosition += el.offsetTop
        el = el.offsetParent;
      }

    return yPosition
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
      padding-top: 80vh;
    }

    &-image {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      height: calc(100vh + 150px);
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;

      &.stuck {
        position: fixed;
      }
    }

    &-inner {
      position: relative;
      z-index: 2;
    }

    &-content {
      height: 100vh;
      max-width: 550px;
    }

    &-text {
      margin-top: 20px;
    }
  }
</style>