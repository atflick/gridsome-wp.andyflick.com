<template>
  <header class="site-header">
    <div class="site-header-logo">
      <g-link to="/">
        <img src="../assets/images/logo-af-dark.svg" alt="AF Logo">
      </g-link>
    </div>
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
    position: relative;
    z-index: 5;
    @include content-constraint($max-width, $margin: 0, $inner-padding: false);
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    &-logo {
      padding: 5px 0;
      width: 60px;

      > a {
        border: 0;
      }

      img {
        width: 100%;
      }
    }
  }
</style>