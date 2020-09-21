<template>
  <div class="center-text">
    <div class="center-text-inner">
      <ParallaxContainer class="center-text-parallax-container -left" :factor=".4" direction="up" :v-if="fields.image_left" :imageUrl="fields.image_left.url"/>

      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 731.54 487.69">
        <defs>
          <svg:style>
            .cls-1 {
              fill: none;
            }

            .cls-2 {
              clip-path: url(#clip-path-left);
            }
          </svg:style>
          <clipPath id="clip-path-left" transform="translate(185.77 106.54)">
            <polygon class="cls-1"
              points="270 0 270 91.84 180 91.84 180 27.47 90 27.47 90 59.72 0 59.72 0 274.62 90 274.62 180 274.62 270 274.62 360 274.62 360 0 270 0" />
          </clipPath>
        </defs>
        <title>Asset 3</title>
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_1-2" data-name="Layer 1">
            <g class="cls-2">
            </g>
          </g>
        </g>
      </svg>
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
  }
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