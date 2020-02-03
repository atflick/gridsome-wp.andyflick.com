<template>
  <div class="hero">
    <ParallaxContainer class="hero-parallax-container" :factor=".4" direction="up">
      <ParallaxImage :imageUrl="fields.image.url"/>
    </ParallaxContainer>
    <div class="hero-inner">
      <div class="hero-content">
        <h1 class="-blue-bg">{{ fields.title }}</h1>
        <p :v-if="fields.text">{{ fields.text }}</p>
      </div>
    </div>
  </div>
</template>


<script>
import ParallaxContainer from '../micros/parallax/ParallaxContainer.vue';
import ParallaxImage from '../micros/parallax/ParallaxImage.vue';
export default {
  components: {
    ParallaxContainer,
    ParallaxImage
  },
  props: {
    fields: Object
  }
}
</script>

<style lang="scss">
  .hero {
    position: relative;
    @include content-constraint($margin: 0, $inner-padding: true);
    min-height: 300px;
    @include bg-pattern;

    &-parallax-container {
      z-index: -1;
      @include absolute(0, 0, 0, 0);
    }

    &-content {
      max-width: 450px;
      position: relative;
      z-index: 2;
      color: primary-color(white);

      h1 {
        display: inline;
        color: primary-color(white);
      }

      p {
        margin-top: 30px;
        max-width: 400px;
      }
    }
  }
</style>