<template>
  <div class="parallax">
    <ParallaxContainer class="parallax-container">
      <ParallaxImage imageUrl=""/>
    </ParallaxContainer>
  </div>
</template>

<script>
import ParallaxContainer from './ParallaxContainer.vue';
import ParallaxImage from './ParallaxImage.vue';
export default {
  name: 'Parallax',
  components: {
    ParallaxContainer,
    ParallaxImage
  }
}
</script>

<style lang="scss">
  .parallax {
    position: relative;
    padding-top: 600px;

    &-container {
      @include absolute(0, 0, 0, 0);
    }
  }
</style>