<template>
  <div class="home-hero">
    <ParallaxContainer class="home-hero-parallax-container" :factor=".4" direction="up" :imageUrl="fields.image.url" />

    <div class="home-hero-inner">
      <div class="home-hero-content">
        <div class="home-hero-title-animation">
          <SplitText :text="fields.title" name="transform-in" tag="h1" class="-blue-bg" />
          <!-- <h1 class="-blue-bg">{{ fields.title }}</h1> -->
        </div>
        <p>{{ fields.text }}</p>
      </div>
    </div>
  </div>
</template>


<script>
import ParallaxContainer from '../micros/parallax/ParallaxContainer.vue';
import ParallaxImage from '../micros/parallax/ParallaxImage.vue';
import SplitText from '../micros/SplitText.vue';

export default {
  components: {
    ParallaxContainer,
    ParallaxImage,
    SplitText
  },
  props: {
    fields: Object
  }
}
</script>

<style lang="scss">
  .home-hero {
    display: flex;
    align-items: center;
    position: relative;
    @include content-constraint($margin: 0, $inner-padding: true);
    min-height: 300px;
    @include bg-pattern;
    min-height: 350px;
    overflow: hidden;

    @include from(10) {
      min-height: 450px;
    }

    &-parallax-container {
      z-index: -1;
      @include absolute(0, 0, 0, 0);
    }

    &-content {
      margin: 0 auto;
      max-width: 550px;
      position: relative;
      z-index: 2;
      text-align: center;
      color: primary-color(white);

      h1 {
        display: inline;
        color: primary-color(white);
      }

      p {
        margin-top: 30px;
      }
    }

    &-flash {
      position: absolute;
      z-index: 0;
      top: -25%;
      left: -300px;
      height: 150%;
      width: 400px;
      background: linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 35%, rgba(255,255,255,1) 50%, rgba(0,0,0,0) 64%, rgba(0,0,0,0) 100%);
      transform: rotate(-30deg);
      animation: wipe 5s 2s ease-in infinite forwards;
      opacity: .05;
    }

    &-title-animation {
      opacity: 0;
      animation: transform-in .3s .2s ease-out forwards;
    }
  }

  @keyframes transform-in {
    0% {
      transform: matrix(0.35,-0.10,-0.50,0.89,34,-11);
      opacity: 0;
    }
    10% {
      opacity: .8;
    }

    100% {
      transform: matrix(0, 0, 0, 0,3 0, 0);
      opacity: 1;
    }
  }

  .transform-in {
    animation-name: transform-in;
  }

  @keyframes wipe {
    0% {
      left: -300px;
    }

    10% {
      left: calc(100% + 300px);
    }

    100% {
      left: calc(100% + 300px);
    }
  }
</style>