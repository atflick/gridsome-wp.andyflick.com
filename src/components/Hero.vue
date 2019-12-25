<template>
  <div class="hero" :style="{ backgroundImage: `url(${image})`}">
    <div class="hero-inner">
      <div class="hero-content">
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