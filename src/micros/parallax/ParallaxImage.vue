<template>
  <div class="parallax-image">
    <ParallaxElement>
      <div class="parallax-image-container" :style="{ backgroundImage: `url(${imageUrl})` }"></div>
    </ParallaxElement>
  </div>
</template>

<script>
import ParallaxElement from './ParallaxElement';
export default {
  name: 'ParallaxImage',
  components: {
    ParallaxElement
  },
  props: {
    imageUrl: String
  }
}
</script>

<style lang="scss" scoped>
  .parallax-image {
    position: relative;

    &-container {
      @include absolute(0, 0, 0, 0);
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
</style>