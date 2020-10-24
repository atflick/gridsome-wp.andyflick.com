<template>
  <div class="center-text">
    <div class="center-text-inner">
      <ParallaxContainer class="center-text-parallax-container -left" :factor=".4" direction="up" :v-if="fields.image_left" :imageUrl="fields.image_left.url"/>

      <div class="center-text-content">
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
  },
  // computed: {
  //   fields() {
  //     return {
  //       title: this.$attrs.fields.title,
  //       text: this.$attrs.fields.text,
  //       image: {
  //         url: this.$attrs.fields.image.url,
  //         alt: this.$attrs.fields.image.alt
  //       },
  //       link: {
  //         title: this.$attrs.fields.link.title,
  //         url: this.$attrs.fields.link.url,
  //         target: this.$attrs.fields.link.target
  //       },
  //       image_left: this.$attrs.fields.image_left[0]
  //     }
  //   }
  // }
}
</script>

<style lang="scss">


  .center-text {
    position: relative;
    @include content-constraint($margin: 0, $inner-padding: true);
    min-height: 300px;
    overflow: hidden;

    &-parallax-container {
      height: 400px;
      position: relative;
      clip-path: url(#clip-path-left);
      /* z-index: -1; */
      /* @include absolute(0, 0, 0, 0); */
    }

    &-content {
      max-width: 450px;
      position: relative;
      z-index: 2;
      color: primary-color(gray);

      h1 {
        display: inline;
        color: primary-color(gray);
      }

      p {
        margin-top: 30px;
        max-width: 400px;
      }
    }
  }
</style>