<template>
  <header class="site-header">
    <div class="site-header-logo">Logo</div>
    <nav class="site-header-nav">
      <PrimaryNav/>
    </nav>
  </header>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  .site-header {
    @include content-constraint($max-width, $margin: 0, $inner-padding: false);
    display: flex;
    justify-content: space-between;

    &-logo {
      padding: 8px 0;
      font-family: $header-font;
      @include font-weight(black);
      @include rem(font-size, 28px);
    }
  }
</style>