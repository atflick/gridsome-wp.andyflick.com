<template>
  <div :is="tag" class="observer" ref="observeElement">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      default: function() {
        return {}
      }
    },
    callback: {
      type: Function
    },
    negativeCallback: {
      type: Function
    },
    tag: {
      default: 'div'
    }
  },
  data() {
    return {
      defaultOptions: {
        rootMargin: '0px 0px -200px 0px',
        threshold: .001
      }
    }
  },
  mounted() {
    this.defaultOptions = Object.assign(this.defaultOptions, this.options || {});


    if (this.$refs.observeElement.children) {
      [...this.$refs.observeElement.children].forEach((child) => {
        // console.dir(child)
        this.observer.observe(child)
      })
    }
  },
  computed: {
    observer() {
      return new IntersectionObserver(this.handler, Object.assign(this.defaultOptions, this.options))
    }
  },
  methods: {
    handler(entries, observer) {
      entries.forEach((entry, index) => {

        const { target, intersectionRatio, isIntersecting } = entry
        const midPoint = entry.rootBounds.height / 2

        const intersectionPoint = entry.intersectionRect.y > midPoint ? 'top' : 'bottom'

        if (isIntersecting && intersectionRatio > 0) {
          return this.callback && this.callback(target, index, intersectionPoint, entry);
        } else {
          return this.negativeCallback && this.negativeCallback(target, index, intersectionPoint, entry);
        }
      })
    }
  }
}
</script>

<style lang="scss">

</style>