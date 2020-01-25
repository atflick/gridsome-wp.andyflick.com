<template>
  <div class="hero" :style="{ backgroundImage: `url(${fields.image.url})`}">
    <div class="hero-inner">
      <div class="hero-content">
        <h1 class="-blue-bg">{{ fields.title }}</h1>
        <p :v-if="fields.text">{{ fields.text }}</p>
      </div>
    </div>
  </div>
</template>


<script>
export default {
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
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    @include bg-pattern;

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