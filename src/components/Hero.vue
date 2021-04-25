<template>
  <div class="hero">
    <ParallaxContainer
      class="hero-parallax-container"
      :factor=".4"
      direction="up"
      :imageUrl="fields.image.url"
      :v-if="fields.image"
      :noFilter="false"
    />

    <div class="hero-inner">
      <div class="hero-content">
        <SplitText :text="fields.title" name="transform-in" tag="h1" class="-blue-bg" />
        <p :v-if="fields.text">{{ fields.text }}</p>
      </div>
    </div>
  </div>
</template>


<script>
import ParallaxContainer from '../micros/parallax/ParallaxContainer.vue';
import SplitText from '../micros/SplitText.vue';

export default {
  name: 'Hero',
  components: {
    ParallaxContainer,
    SplitText
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
    background: $purple-blue;
    overflow: hidden;

    &-parallax-container {
      position: relative;
      /* z-index: -1; */
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