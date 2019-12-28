<template>
  <footer class="site-footer">
    <div class="site-footer-inner">
      <div class="site-header-logo">
        <g-link to="/">
          <img src="../assets/images/logo-af-ko.svg" alt="AF Logo">
        </g-link>
      </div>
    </div>
  </footer>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  .site-footer {
    @include content-constraint($margin: 0, $inner-padding: false);
    background-color: primary-color(gray);
    @include bg-pattern;

    &-inner {
      position: relative;
      display: flex;
      justify-content: center;
      padding: 50px 0;
    }

  }
</style>