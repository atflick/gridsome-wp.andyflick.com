<template>
  <div class="page-container" ref="pageContainer">
    <Header/>
      <main>
        <transition :name="transitionName" mode="out-in" v-on:leave="leave" v-on:after-enter="enter" appear>
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
import { EventBus } from '../event-bus';
import Header from '~/components/Header.vue'

export default {
  components: {
    Header
  },
  data() {
    return {
      transitionComplete: false,
      transitionName: 'slide'
    }
  },
  methods: {
    leave() {
      this.transitionComplete = true;
    },
    enter() {
      this.transitionComplete = false;
    }
  },
  watch: {
    transitionComplete(from, to) {
      if (to) {
        this.scroller.resizeRequest = 1;
        this.updateScroller();
      }
    },
    $route(to, from) {
      if (to.meta.routeId === 'Categories') {
        this.transitionName = 'categories';
      } else {
        this.transitionName = 'slide';
      }
    }
  }
}

</script>

<style lang="scss">
  body {
    overflow-x: hidden;
    overflow-y: auto;
  }

  .slide {
    &-leave-active {
      transition: all .5s;
      opacity: 1;
      transform: translateX(0);
    }

    &-leave-to /* .slide-leave-active below version 2.1.8 */ {
      opacity: 0;
      transform: translateX(-100%);
    }

    &-enter {
      opacity: 0;
      transform: translateX(100%);
    }

    &-enter-to {
      opacity: 1;
      transform: translateX(0);
    }

    &-enter-active {
      transition: all .5s;
    }
  }

</style>