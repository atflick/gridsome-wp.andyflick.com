<template>
  <div class="test">
    <div class="space-container" style="background-color: red;"></div>
    <div class="space-container" style="background-color: red;"></div>
    <div class="space-container" style="background-color: green;"></div>
    <div class="space-container" style="background-color: blue;"></div>
    <div class="space-container" style="background-color: blue;"></div>
    <Observer>
      <div slot="default" class="some-element"></div>
    </Observer>
    <div class="space-container" style="background-color: purple;"></div>
    <div class="space-container" style="background-color: purple;"></div>
    <div class="space-container" style="background-color: purple;"></div>
    <div class="space-container" style="background-color: purple;"></div>
  </div>
</template>

<script>
import Observer from '@/micros/Observer'
export default {
  components: {
    Observer
  }

}
</script>

<style lang="scss">
  .space-container {
    height: 50vh;
  }
  .some-element {
    height: 200px;
    background-color: primary-color(blue );
  }
</style>