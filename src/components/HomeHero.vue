<template>
  <div class="home-hero" :style="{ backgroundImage: `url(${image})`}">
    <div class="home-hero-flash"></div>
    <div class="home-hero-inner">
      <div class="home-hero-content">
        <h1 class="-blue-bg">{{ title }}</h1>
        <p>{{ text }}</p>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      title: this.$attrs.fields.title,
      text: this.$attrs.fields.text,
      image: this.$attrs.fields.image.url

    }
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
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    @include bg-pattern;
    min-height: 350px;
    overflow: hidden;

    @include from(10) {
      min-height: 450px;
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