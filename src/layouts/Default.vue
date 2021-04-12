<template>
  <div class="page-container" ref="pageContainer">
    <Header/>
      <main>
        <transition :name="transitionName" mode="out-in" @beforeEnter="beforeEnter" @leave="leave" @after-enter="enter" appear>
          <router-view  :key="$context.id"></router-view>
        </transition>
      </main>
      <PageTransition :start="canvasStart" />
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
import PageTransition from '~/components/PageTransition.vue'

export default {
  components: {
    Header,
    PageTransition
  },
  data() {
    return {
      transitionComplete: false,
      transitionName: 'slide',
      canvasStart: false
    }
  },
  methods: {
    beforeEnter() {
      if (this.transitionName === 'canvas') {
        // this.canvasStart = true;
      }
    },
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
        // this.scroller.resizeRequest = 1;
        // this.updateScroller();
      }
    },
    $route(to, from) {
      if (to.meta.routeId === 'Categories') {
        this.transitionName = 'categories';
      } else {
        this.transitionName = 'canvas';
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