<template>
  <div class="hero" :style="{ backgroundImage: `url(${image})`}">
    <h1>{{ title }}</h1>
    <p>{{ text }}</p>
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
h1 {
  /* color: $red; */

  @include from(5) {
    background: red;
  }
}
</style>