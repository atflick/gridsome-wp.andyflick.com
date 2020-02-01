<template>
  <div class="page-container">
    <Header/>
      <main>
        <transition name="fade" mode="out-in">
          <router-view  :key="$context.id"></router-view>
        </transition>
      </main>
    <Footer/>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>
<script>
import Header from '~/components/Header.vue'

export default {
  components: {
    Header
  }
}

</script>

<style lang="scss">
.fade-leave-active {
  transition: all .5s;
  opacity: 1;
  transform: translateX(0);
}
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(-100%);
}
.fade-enter {
  opacity: 0;
  transform: translateX(100%);
}
.fade-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.fade-enter-active {
  transition: all .5s;
}
</style>