<template>
  <div class="observer" ref="observeElement">
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
    }
  },
  data() {
    return {
      defaultOptions: {
        rootMargin: '0px 0px -200px 0px',
        threshold: 0
      }
    }
  },
  mounted() {
    console.dir(this.$refs.observeElement)

    if (this.$refs.observeElement.children) {
      [...this.$refs.observeElement.children].forEach((child) => {
        console.dir(child)
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


        if (isIntersecting && intersectionRatio > 0) {
          return this.callback && this.callback(target, index);
        } else {
          return this.negativeCallback && this.negativeCallback(target, index);
        }
      })
    }
  }
}
</script>

<style lang="scss">

</style>