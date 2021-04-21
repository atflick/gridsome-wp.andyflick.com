<template>
  <div class="page-container" ref="pageContainer">
    <BlobAnimation />
    <Header/>
    <main :class="{ glitching }">
      <transition :name="transitionName" mode="out-in" @beforeEnter="beforeEnter" @leave="leave" @after-enter="enter" appear>
        <router-view  :key="$context.id"></router-view>
      </transition>
    </main>
      
      <PageTransition />
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
      transitionName: 'fade',
      canvasStart: false,
      glitching: false
    }
  },
  methods: {
    beforeEnter() {
      if (this.transitionName === 'canvas') {
        this.glitching = true
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
    transitionComplete(val) {
      console.log(val);
      this.glitching = val
    },
    $route(to, from) {
      if (to.meta.routeId === 'Categories') {
        this.transitionName = 'categories';
      } else {
        this.transitionName = 'fade';
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

  .glitching {
    filter: url(#transmissionerror);
  }

  .slide {
    &-leave-active {
      transition: all .3s;
      opacity: 1;
      transform: translateY(0);
    }

    &-leave-to /* .slide-leave-active below version 2.1.8 */ {
      opacity: 0;
      transform: translateY(-100%);
    }

    &-enter {
      opacity: 0;
      transform: translateY(100%);
    }

    &-enter-to {
      opacity: 1;
      transform: translateY(0);
    }

    &-enter-active {
      transition: all .3s;
    }
  }

  .fade {
    &-leave-active {
      transition: all .5s;
      opacity: 1;
    }

    &-leave-to /* .slide-leave-active below version 2.1.8 */ {
      opacity: 0;
    }

    &-enter {
      opacity: 0;
    }

    &-enter-to {
      opacity: 1;
    }

    &-enter-active {
      transition: all .5s;
    }
  }

</style>